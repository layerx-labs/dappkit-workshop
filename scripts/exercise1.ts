import { ethers } from "hardhat";
import { ERC20, Web3Connection } from "@taikai/dappkit"
import Keys from "../data/accounts-testing"

/**
 * Exercise 1: Solution
 */
async function main() { 
    
    const tokenName = "GM Dappkit Token";
    const tokenSymbol =  "GMD";
    // the total amount of the token (with 18 decimals; 100M = 1000000000000000000000000)
    const totalSupply  = "10000000".concat("000000000000000000");      
    const [owner, otherAccount] = Keys;
    
    // Web3 Connection Configuration Settings    
    const web3Con = new Web3Connection({
      debug: true,
      web3Host: "http://localhost:8545",
      privateKey: owner.privKey,       
    });
    // 1. Deploy GM Dappkit Token 
    const erc20Deployer = new ERC20(web3Con);    
    const txReceipt = await erc20Deployer.deployJsonAbi(
      tokenName, 
      tokenSymbol, 
      totalSupply, 
      owner.address,
    );
    console.log("Dappkit WorkShop Token to ", txReceipt.contractAddress);
    // 2. Load the ERC-20 Modal with the deployed contract
    const gmDappkit = new ERC20(web3Con, txReceipt.contractAddress);    
    
    // 3. Transfer X to another account
    await gmDappkit.transfer(otherAccount.address, 1000);

    // 4. Read the balance 
    const balance = await gmDappkit.balanceOf(otherAccount.address);
    console.log(`Other Account Balance is ${balance} ${tokenSymbol}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  