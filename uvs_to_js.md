# Retrieving Public Properties and Calling Functions

## Retrieve `owner` Public Property

```js
// Retrieving owner public property
let contractOwner = await contract.methods.owner().call();
console.log("Contract Owner:", contractOwner);
```

## Retrieve `ownRole` Public Property for an Address

```js
// Retrieving ownRole public property for a specific address
let addressToCheck = "0x...";
let role = await contract.methods.ownRole(addressToCheck).call();
console.log("Role of", addressToCheck + ":", role);
```

## Retrieve `studentRef` Public Property for an Address

```js
// Retrieving studentRef public property for a specific address
let studentAddress = "0x...";
let studentData = await contract.methods.studentRef(studentAddress).call();
console.log("Student data for", studentAddress + ":", studentData);
```


## Retrieve `degreeRef` Public Property for an Address

```js
// Retrieving degreeRef public property for a specific address
let degreeAddress = "0x...";
let degreeData = await contract.methods.degreeRef(degreeAddress).call();
console.log("Degree data for", degreeAddress + ":", degreeData);
```

## Call `setStudent` Function

```js
// Calling setStudent function
await contract.methods.setStudent(userAddress, name, surnames, id, degreeAdd).send({ from: senderAddress });
```

## Call `setDegree` Function

```js
// Calling setDegree function
await contract.methods.setDegree(userAddress, code, universityAdd).send({ from: senderAddress });
```


## Call `setUniversity` Function

```js
// Calling setUniversity function
await contract.methods.setUniversity(userAddress, code).send({ from: senderAddress });
```

## Call `setExRate` Function

```js
// Calling setExRate function
await contract.methods.setExRate(currency, newRate).send({ from: senderAddress });
```

## Call `uniTransfer` Function

```js
// Calling uniTransfer function
await contract.methods.uniTransfer(to, amount, srcCurrency, dstCurrency).send({ from: senderAddress });
```

## Call `uniMint` Function

```js
// Calling uniMint function
await contract.methods.uniMint(to, amount, dstCurrency).send({ from: senderAddress });
```

## Call `RemStudent` Function

```js
// Calling RemStudent function
await contract.methods.RemStudent(user, graduated).send({ from: senderAddress });
```

## Call `DisDegree` Function

```js
// Calling DisDegree function
await contract.methods.DisDegree(user).send({ from: senderAddress });
```

## Call `EnDegree` Function

```js
// Calling EnDegree function
await contract.methods.EnDegree(user).send({ from: senderAddress });
```

## Call `changeCode` Function

```js
// Calling changeCode function
await contract.methods.changeCode(newCode).send({ from: senderAddress });
```

# Necessary Imports for Web3 and Smart Contract

To interact with your smart contract using Web3.js, you need to import Web3 and initialize it with a provider (e.g., MetaMask provider). Then, you import your smart contract ABI (Application Binary Interface) and instantiate it with the contract address.

```js
const Web3 = require('web3');

// Initialize Web3 with provider (e.g., MetaMask)
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Import Smart Contract ABI
const contractABI = require('./ethereum/build/UVS_updated.json'); // Assuming ABI is stored in a JSON file

// Instantiate Smart Contract
const contractAddress = '0x...'; // Contract address on the blockchain
const contract = new web3.eth.Contract(contractABI, contractAddress);
```

Replace './UVS_updated.json' with the correct path to your smart contract ABI file. Additionally, replace '0x...' with the actual address of your deployed smart contract on the blockchain.

