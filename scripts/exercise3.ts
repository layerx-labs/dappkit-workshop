import { Model, Web3Connection } from "@taikai/dappkit"
import Keys from "../data/accounts-testing";
import fs from 'fs';
import { utils } from 'ethers';


/**
 * Exercise 3: Solution
 */
async function main() { 
    const [owner] = Keys;
    const ABIFilePath = "build/contracts/Attendees.sol/Attendees.json";
    const abiJson = fs.readFileSync(ABIFilePath, 'utf8');
    // Parse the JSON data into an object
    const contractABI = JSON.parse(abiJson);
    // Web3 Connection Configuration Settings    
    const web3Con = new Web3Connection({
      debug: false,
      web3Host: "http://localhost:8545",
      privateKey: owner.privKey,       
    });
    // 1. Deploy GM Dappkit Token 
    const attendeesDeployer = new Model(web3Con, contractABI.abi);
    attendeesDeployer.loadAbi();
    const txReceipt = await attendeesDeployer.deploy({
        data: contractABI.bytecode,
    },  web3Con.Account);
    console.log("Dappkit Attendees Contract deployed to ", txReceipt.contractAddress);

    const attendeesContract = new Model(web3Con, contractABI.abi, txReceipt.contractAddress); 
    // Register a new Ateendee
    await attendeesContract.sendTx(attendeesContract.contract.methods["register"]("Helder Vasconcelos", "helder@layerx.xyz"));
    // Get the number of ateendees
    const len = await attendeesContract.callTx(attendeesContract.contract.methods["getAttendeesLen"]());
    console.log("The number of ateendees ate", len);
    // Get the Ateendee 0 Name
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
  