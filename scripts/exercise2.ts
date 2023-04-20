import {Erc721Standard, Web3Connection} from "@taikai/dappkit"
import {AccountsTesting} from "../data/accounts-testing";

/**
 * Exercise 2
 */
async function main() {

  // 0. Setup Web3 Connection
  const connection = new Web3Connection({web3Host: 'http://localhost:8545', privateKey: AccountsTesting[0].privKey})
  const AliceAddress = AccountsTesting[1].address; // 0xF39FC4F1d439D03E82f698a86f2D79C6aa9dD380
  // 1. Deploy GM Dappkit Token

  const gmNFTToken = new Erc721Standard(connection);

  await gmNFTToken.deployJsonAbi(`GM NFT`, `GMNFT`);
  console.log(`NFT Contract Address`, gmNFTToken.contractAddress);

  // 2. Mint a NFT
  // https://taikai.infura-ipfs.io/ipfs/QmdV1FFsqpfVhPp5traTN3xF8WjauEKWgy1HefjsLosgvL

  const tx = await gmNFTToken.mint(AliceAddress, 0);
  const tx2 = await gmNFTToken.setTokenURI(0, "https://taikai.infura-ipfs.io/ipfs/QmdV1FFsqpfVhPp5traTN3xF8WjauEKWgy1HefjsLosgvL");
  console.log(`Mint Transaction block number`, tx.blockNumber);
  console.log(`SetTokenUri Transaction block number`, tx2.blockNumber);

  // 3. Who is the owner of 0
  console.log(`Owner of tokenId: 0`, await gmNFTToken.ownerOf(0)); // 0xF39FC4F1d439D03E82f698a86f2D79C6aa9dD380
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});