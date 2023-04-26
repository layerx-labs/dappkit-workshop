import {Model, Web3Connection} from "@taikai/dappkit"
import * as AttendeesArtifact from "../build/contracts/Attendees.sol/Attendees.json";
import {AccountsTesting} from "../data/accounts-testing";

/**
 * Exercise 3:
 */
async function main() {

  // 0. Setup Web3 Connection
  const connection = new Web3Connection({web3Host: 'http://localhost:8545', privateKey: AccountsTesting[0].privKey});

  const model = new Model(connection, AttendeesArtifact.abi as any);
  // 1. Deploy Attendee Contract

  await model.deploy({data: AttendeesArtifact.bytecode}, connection.Account);

  // 2. Register a new Ateendee
  const tx = await model.sendTx(model.contract.methods.register(`name`, `email@domain.tld`));
  console.log(`AttendeesArtifact contract address`, tx.contractAddress);

  // 3. Get the number of ateendees
  console.log(await model.callTx(model.contract.methods.getAttendeesLen()));

  // 4. Get the Ateendee 0 Name
  console.log(await model.callTx(model.contract.methods.getAttendeeDetails(0)))
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
  