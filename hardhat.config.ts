import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import TESTING_ACCOUNTS from "./data/accounts-testing"

const config: HardhatUserConfig = {
  solidity:  {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "local",
  networks: {
    local: {
      url: 'http://localhost:8545',
      accounts: [...TESTING_ACCOUNTS.map(account=> account.privKey)],
    },
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.DEPLOY_INFURA_KEY}`
    },
  },
  paths: {
    artifacts: "./build"
  }
};

export default config;
