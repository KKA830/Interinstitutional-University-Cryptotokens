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

### For this specific project

Before compiling and deploying the smart contract, you should consider specifying an address from which you can access the webpage. If not, you won't be able to set the roles for the other users.

If the address which launches the contract isn't at reach for accessing the webpage, simply change line `72` of [./contracts/UVS_updated.sol]{./contracts/UVS_updated.sol} being `ownRole[owner] = Role.AUT;` (inside the consturctor) to the following line:

```solidity
ownRole[<address to aquire AUT role>] = Role.AUT;
```

> Change `<address to aquire AUT role>` for the desired address.

This project also uses [`tailwind`](https://tailwindcss.com/) for css styling. For logging purpouses, the following command can be used:

```sh
npm run tailwind:watch
```

> __warning:__ when consulting a specific balance ([./src/pages/ViewBalance.js](./src/pages/ViewBalance.js)) the page may cause an error. In that case 2 or 3 refreshes in the browser may fix the problem.

## Execution with Docker

### Requirements for Docker execution
Requirements: [Docker](https://docs.docker.com/get-docker/).