require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const fs  = require("fs")
const privateKey = fs.readFileSync(".secrets").toString()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "testnet",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    //   chainId: 31337
    // },
    hardhat: {
      chainId: 1337
    },
    testnet: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 4,
      gasPrice: 20000000000,
      accounts: [privateKey]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [privateKey]
    }
  },
  etherscan:{
    apiKey: "Q6XX8Q8SIY6S8TZYDWX6IW4Z5PDX4ZQ6FI"
  },
  solidity: "0.8.4",
};
// npx hardhat verify --network testnet 0x1746c72De0f53d5Bb8a8dc4D029C70EF88ed797E
