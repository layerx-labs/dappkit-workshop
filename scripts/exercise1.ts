import { ERC20, Web3Connection } from "@taikai/dappkit"

/**
 * Exercise 1
 */ 

async function main() { 

    // 0. Setup Web3 Connection  
    
    // 1. Deploy GM Dappkit Token 
    
    // 2. Load the ERC-20 Modal with the deployed contract
    
    // 3. Transfer X to another account
    
    // 4. Read the balance 
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});