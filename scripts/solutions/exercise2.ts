import { Erc721Standard, Web3Connection } from "@taikai/dappkit"
import Keys from "../../data/accounts-testing";
import { json } from "stream/consumers";

/**
 * Exercise 2
 *
 * The main function is an async function that deploys and interacts with an ERC-721 token 
 * contract using the DappKit framework. Here's a breakdown of what the function does:
 * 
 * First, it defines the token specifications such as the token name, symbol, and total supply.
 * 
 * It sets up a Web3 connection using the Web3Connection class, passing in the 
 * necessary arguments such as the web3Host and privateKey.
 * 
 * It deploys the ERC-721 token contract using the Erc721Standard class, passing in the web3Con 
 * object, and the nftName and nftSymbol arguments. The deployed contract instance is stored in gmDappkit.
 * 
 * The function mints a new NFT to otherAccount.address with ID 0 and sets its metadata using 
 * mint and setTokenURI methods on gmDappkit.
 * 
 * It retrieves the owner of the NFT with ID 0 using the ownerOf method on gmDappkit.
 * 
 * The function outputs the contract address, mints and sets metadata for the NFT, and retrieves 
 * the owner of the NFT to the console for testing purposes.
 * 
 */
 async function main() { 
    
    // ERC-20 Token Specs
    const nftName = "GM Dappkit Participant";
    const nftSymbol =  "GMDP";
    // the total amount of the token (with 18 decimals; 100M = 1000000000000000000000000)
    const totalSupply  = "10000000".concat("000000000000000000");      
    const [owner, otherAccount] = Keys;
    
    // 0. Setup Web3 Connection
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
    const ownerAddres = await gmDappkit.ownerOf(0);
    console.log(`The Owner of NFT 0 is ${ownerAddres}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});