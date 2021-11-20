const Web3 = require('web3');
const web3 = new Web3("https://eth-goerli.alchemyapi.io/v2/vGpsCOc1T8HsIyv2A73j6XyFQs98ftBi");
// The minimum ABI to get ERC20 Token balance
let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];
  
async function getBalance(tokenAddress, walletAddress){
    let contract = new web3.eth.Contract(minABI,tokenAddress);
    const decimals = await contract.methods.decimals().call();
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance/(10**decimals);
}



// const uniq = require('uniq');

// function myfunc() {
//   return uniq([1, 2, 2, 3]).join(' ');
// }
exports.getBalance = getBalance;