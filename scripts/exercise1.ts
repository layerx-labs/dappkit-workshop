import { ethers } from "hardhat";
import { ERC20, Web3Connection } from "@taikai/dappkit"
import Config  from "../hardhat.config"
import Keys from "../data/accounts-testing"

async function main() { 
    const rpcUrl = "http://localhost:8545";
    const [owner, otherAccount] = Keys;
    const web3Con = new Web3Connection({
      debug: true,
      web3Host: rpcUrl,
      privateKey: owner.privKey,       
    });
    // the total amount of the token (with 18 decimals; 100M = 1000000000000000000000000)
    const totalSupply  = "10000000".concat("000000000000000000");
    // 1. Deploy GM Dappkit Token 
    const erc20Deployer = new ERC20(web3Con);    
    const txReceipt = await erc20Deployer.deployJsonAbi(
      "GM Dappkit Token", // the name of the token
      'DKT', // the symbol of the token
      totalSupply, 
      owner.address,
    );
    console.log("Dappkit WorkShop Token to ", txReceipt.contractAddress);
    // 2. Transfer X to another account
    const gmDappkit = new ERC20(web3Con, txReceipt.contractAddress);    
    await gmDappkit.transfer(otherAccount.address, 1000);
    console.log("My Balance is ", await gmDappkit.balanceOf(otherAccount.address));
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  