import {ERC20, toSmartContractDecimals, Web3Connection} from "@taikai/dappkit"
import {AccountsTesting} from "../data/accounts-testing";

/**
 * Exercise 1
 */ 

async function main() { 

  const connection = new Web3Connection({web3Host: 'http://localhost:8545', privateKey: AccountsTesting[0].privKey})
  await connection.start();

  const connectedAddress = await connection.getAddress();
  console.log(`Connected Address`, connectedAddress);

  const gmToken = new ERC20(connection);

  await gmToken.deployJsonAbi(`name`, `symbol`, toSmartContractDecimals(1000), connectedAddress);
  console.log(`Contract Address`, gmToken.contractAddress);

  const AliceAddress = AccountsTesting[1].address;
  await gmToken.transfer(AliceAddress, 1);
  console.log(`Account Balance`, AliceAddress, await gmToken.balanceOf(AliceAddress));
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});