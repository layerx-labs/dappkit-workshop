import { ERC20, Web3Connection } from "@taikai/dappkit"
import Keys from "../../data/accounts-testing";

/**
 * Exercise 1
 * This is an asynchronous function called main that performs the following operations:
 * 
 * Define the ERC-20 token specifications by creating variables to store the token name, 
 * symbol, and total supply.
 * Get the account keys of the owner and another account and store them in variables.
 * Set up a Web3 connection by creating an instance of the Web3Connection class with the owner's 
 * private key and the URL of the local blockchain node.
 * Deploy an ERC-20 token contract by creating an instance of the ERC20 class with the Web3 connection 
 * and calling the deployJsonAbi function with the token name, symbol, total supply, and owner's address. 
 * The function returns a transaction receipt that includes the address of the deployed contract.
 * Log the address of the deployed token contract to the console.
 * Load the ERC-20 token modal with the deployed contract by creating another instance of the ERC20 class 
 * with the Web3 connection and the contract address obtained in step 4.
 * Transfer 1000 tokens to the other account by calling the transfer function from the loaded ERC-20 token 
 * modal with the other account's address and the amount of tokens to transfer.
 * Read the balance of the other account by calling the balanceOf function from the loaded ERC-20 token modal 
 * with the other account's address and logging the result to the console.
 * This function assumes that the Keys variable contains the account keys of the owner and another account. 
 * It can be executed as is without any input parameters.
 */ 

async function main() { 
    // ERC-721 Token Specs
    const tokenName = "Dappkit Workshop NFT";
    const tokenSymbol =  "GMD";
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
main().then(()=>{
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});