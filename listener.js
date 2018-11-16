var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var fs = require("fs");
var solc = require('solc');
var sms = require('./sms');
var schedule = require('node-schedule');


//初始化web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //我本地的私有链信息
    //启用命令：> geth --networkid 1108 --nodiscover --datadir ./ --rpc --rpcapi net,eth,web3,personal --rpcaddr 127.0.0.1 --rpcport 8545 console
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
}

var source = fs.readFileSync('./contracts/sait.sol', 'utf8');
var compiledContract = solc.compile(source, 1);

var abi = compiledContract.contracts[':SAIToken'].interface;
console.info('abi: ' + JSON.stringify(abi));

// var bytecode = compiledContract.contracts[':SAIToken'].bytecode;
// console.info('bytecode: ' + bytecode);

// bytecode='0x' + bytecode;
// var gasEstimate = web3.eth.estimateGas({data: bytecode});
// console.info('gasEstimate: ' + gasEstimate);

var MyContract = web3.eth.contract(JSON.parse(abi));
// console.info(MyContract);

var myContractInstance = MyContract.at('0x34f0d846c766874413938994da32360Cf0E4350d');
// console.info(myContractInstance);


// var balance = myContractInstance.balanceOf('0x79E3FaA828793b8d96E947f59DFA4b767e12B5Ed');
//
// console.info('address balance: ' + web3.fromWei(balance, 'ether'));

// var locked = true;
//
// function scheduleCronstyle() {
//
//     //job任务
//     var j = schedule.scheduleJob('0 */3 * * * ?', function () {
//         locked = myContractInstance.frozenAccount('0x79E3FaA828793b8d96E947f59DFA4b767e12B5Ed');
//         console.info(new Date() + ' sait 合约 -- locked: ' + locked);
//         if (!locked) {
//             sms.sendSms('18321972003', '1200');
//         }
//     });
//
//     setInterval(function () {
//         console.info(new Date() + ' -- setInterval 取消定时检查 -- locked: ' + locked);
//         if (!locked) {
//             console.log(new Date() + ' -- locked: ' + locked + '定时器取消');
//             j.cancel();
//         }
//     },  1*60*1000); //每一分钟检查一下，进行取消操作
// }
//
// scheduleCronstyle();


//myContractInstance.freezeAccount('0x79E3FaA828793b8d96E947f59DFA4b767e12B5Ed', false);

//var FrozenFundsEvent = myContractInstance.FrozenFunds({frozen:true}, {fromBlock: 6408115, toBlock: 'latest'});


//console.info(FrozenFundsEvent);
// FrozenFundsEvent.watch(function(error, result){
//     if (!error){
//         console.log(JSON.stringify(result));
//     } else{
//         console.info(error);
//     }
// });