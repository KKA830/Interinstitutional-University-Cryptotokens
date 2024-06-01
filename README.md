# EthereumReactJSTemplate
Plantilla per compilar i desplegar un Smart Contract desenvolupat amb Solidity a Ethereum, i accedir-hi mitjançant una aplicació desenvolupada amb una aplicació web amb interfície web ReactJSv6. Es pot executar a NodeJS o Docker.

## Execution with NodeJS

### Requirements for NodeJS execution
Requirements: [Node 18.12.1](https://nodejs.org/en/download/).

### Requirements for project execution
Create a .env file inside your project repository with a new variable named MNEMONIC and assign it your wallet phrase mnemonic. 
```
MNEMONIC = 
```

### Requirements for Hardhat testing
Add in the .env file the following variables: INFURA_KEY and COINMARKETCAP_API_KEY. You will need to get an infura and coinmarketcap API 
Keys and assign them to these variables respectively. 

```
INFURA_KEY =
COINMARKETCAP_API_KEY =
```

### Commands with NodeJS
To install all dependencies, if necessary:
```
npm install
```

To compile the smart contract:
```
npm run ethereum_compile
```

To deploy to Sepolia test network:
```
npm run ethereum_deploy
```

To execute test:
```
npm run ethereum_test
```

To deploy to GitHub Pages:
```
npm run deploy
```

To start React JS development server:
```
npm run start
```

To execute Hardhat test: 
```
npx hardhat test
```

