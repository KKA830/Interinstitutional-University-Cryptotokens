import web3 from './web3';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

const universies = require('./build/UVS_updated.json');

const instance = new web3.eth.Contract(
    universies.abi,
    universies.address
);

export default instance;
