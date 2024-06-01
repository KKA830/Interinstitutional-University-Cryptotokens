import web3 from './web3';

const Delivery = require('./build/UVS_updated.json');

export default (address) => {
    return new web3.eth.Contract(
        Delivery.abi,
        address
    );
}