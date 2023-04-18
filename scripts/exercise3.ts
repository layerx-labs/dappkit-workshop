import { Model, Web3Connection } from "@taikai/dappkit"
import * as AttendeesArtifact from "../build/contracts/Attendees.sol/Attendees.json";

/**
 * Exercise 3: 
 */
async function main() { 

    // 0. Setup Web3 Connection     
    
    // 1. Deploy Attendee Contract 
    
    // 2. Register a new Ateendee
    
    // 3. Get the number of ateendees
    
    // 4. Get the Ateendee 0 Name
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
  