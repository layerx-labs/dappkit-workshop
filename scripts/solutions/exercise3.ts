import { Model, Web3Connection } from "@taikai/dappkit"
import Keys from "../../data/accounts-testing";
import fs from 'fs';
import * as AttendeesArtifact from "../../build/contracts/Attendees.sol/Attendees.json";

/**
 * Exercise 3: 
 * 
 * The function main is an async function that deploys and interacts with an Attendee
 * contract using the DappKit framework. Here's a breakdown of what the function does:
 * 
 * First, it sets up a Web3 connection using the Web3Connection class, passing in the 
 * necessary arguments such as the web3Host and privateKey. It then deploys the Attendee contract using the Model class, 
 * which takes in the web3Con object and the ABI of the contract. The deployed contract 
 * instance is stored in attendeesContract.
 * The function registers a new attendee by calling the register method on the 
 * attendeesContract instance using sendTx.
 * It retrieves the number of attendees by calling the getAttendeesLen method on 
 * the attendeesContract instance using callTx.
 * Finally, the function retrieves the details of the first attendee by calling the 
 * getAttendeeDetails method on the attendeesContract instance using callTx.
 * The function outputs the contract address, number of attendees, and attendee details 
 * to the console for testing purposes.
 */
async function main() { 
    const [owner] = Keys;
    // 0. Setup Web3 Connection     
    const web3Con = new Web3Connection({
      debug: false,
      web3Host: "http://localhost:8545",
      privateKey: owner.privKey,       
    });
    // 1. Deploy Attendee Contract 
    const attendeesDeployer = new Model(web3Con, AttendeesArtifact.abi);
    attendeesDeployer.loadAbi();
    const txReceipt = await attendeesDeployer.deploy({
        data: AttendeesArtifact.bytecode,
    },  web3Con.Account);
    console.log("Dappkit Attendees Contract deployed to ", txReceipt.contractAddress);

    const attendeesContract = new Model(web3Con, AttendeesArtifact.abi, txReceipt.contractAddress); 
    
    // 2. Register a new Ateendee
    await attendeesContract.sendTx(attendeesContract.contract.methods["register"]("Helder Vasconcelos", "helder@layerx.xyz"));
    
    // 3. Get the number of ateendees
    const len = await attendeesContract.callTx(attendeesContract.contract.methods["getAttendeesLen"]());
    console.log("The number of ateendees ate", len);
    
    // 4. Get the Ateendee 0 Name
    const res = await attendeesContract.callTx(attendeesContract.contract.methods["getAttendeeDetails"](0));
    console.log("The number of ateendees ate", len);
    console.log("Ateendee 0 is ",res[0]);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
  