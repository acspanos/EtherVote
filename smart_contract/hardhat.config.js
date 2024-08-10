//https://eth-goerli.g.alchemy.com/v2/3i7lBSJmQYshPz1SVIl6q5VwqDHsRh1K

require('@nomiclabs/hardhat-waffle');

module.exports = {
 solidity: "0.8.0",
  networks: {
    sepolia: {
      url: 'add your alchemy project url',
      accounts: ['add your Metamask address private key']
    }
  }
}