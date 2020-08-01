const fs = require('fs');
const HDWallet = require('truffle-hdwallet-provider');

const secrets = JSON.parse(fs.readFileSync('.secrets').toString().trim());

module.exports = {
  networks: {
    ropsten: {
      provider: () => 
        new HDWallet(
          secrets.seed,
          `https://ropsten.infura.io/v3/${secrets.projectId}`
        ),
      network_id: 3,
      
    }
  }
};