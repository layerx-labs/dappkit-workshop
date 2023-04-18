import { Erc721Standard, Web3Connection } from "@taikai/dappkit"
import Keys from "../data/accounts-testing";
import { json } from "stream/consumers";

/**
 * Exercise 2
 */
 async function main() { 

    // 0. Setup Web3 Connection

    // 1. Deploy GM Dappkit Token 

    // 2. Load the ERC-20 Modal with the deployed contract
    
    // 3. Mint a NFT

    // 4. Who is the owner of 
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});