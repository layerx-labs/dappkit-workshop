import { Erc721Standard, Web3Connection } from "@taikai/dappkit"
import Keys from "../data/accounts-testing";
import { json } from "stream/consumers";

/**
 * Exercise 3: Solution
 */
async function main() { 
    
    const nftName = "GM Dappkit Participant";
    const nftSymbol =  "GMDP";
    // the total amount of the token (with 18 decimals; 100M = 1000000000000000000000000)
    const totalSupply  = "10000000".concat("000000000000000000");      
    const [owner, otherAccount] = Keys;
    
    // Web3 Connection Configuration Settings    
    const web3Con = new Web3Connection({
      debug: false,
      web3Host: "http://localhost:8545",
      privateKey: owner.privKey,       
    });
    // 1. Deploy GM Dappkit Token 
    const erc721Deployer = new Erc721Standard(web3Con);    
    const txReceipt = await erc721Deployer.deployJsonAbi(
        nftName, 
        nftSymbol, 
    );
    console.log("Dappkit WorkShop NFT deployed to ", txReceipt.contractAddress);
    // 2. Load the ERC-20 Modal with the deployed contract
    const gmDappkit = new Erc721Standard(web3Con, txReceipt.contractAddress);    
    // 3. Mint a NFT
    console.log(`Minting to ${otherAccount.address} NFT - 0`, txReceipt.contractAddress);
    await gmDappkit.mint(otherAccount.address, 0, '0x0');
    await gmDappkit.setTokenURI(0, "https://taikai.infura-ipfs.io/ipfs/QmdV1FFsqpfVhPp5traTN3xF8WjauEKWgy1HefjsLosgvL");

    // 4. Who is the owner of 
    const ownerAddres = await gmDappkit.contract.methods.ownerOf(0).call();
    console.log(`The Owner of NFT 0 is ${ownerAddres}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  