const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "mention best penalty grain air analyst indoor allow artwork loud lesson spring";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    intersect: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://subnets.avax.network/pearl/testnet/rpc"
        ),
      network_id: 1612,
      gas: 8000000,
      gasPrice: 250000000000,
      // confirmations: 2,
      // timeoutBlocks: 200,
      // skipDryRun: true,
    },
    avalancheFuji: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://api.avax-test.network/ext/bc/C/rpc"
        ),
      network_id: 43113,
      gas: 8000000,
      gasPrice: 250000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    k3labs: {
      provider: () =>
        new HDWalletProvider(
          mnemonic, 
          'https://rpc.k3labs.io'
        ),
      network_id: 12345,       
      gas: 8000000,          
      gasPrice: 25000000000,    
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: true,
          runs: 15000,
        },
        evmVersion: "paris",
      },
    },
  },
};
