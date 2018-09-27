var sait = artifacts.require("./SAIToken.sol");

module.exports = function(deployer) {
  deployer.deploy(sait,'0xeb680f30715f347d4eb5cd03ac5eced297ac5046','0x018673c699738c569d88d31167be1d2cb97c443e','0x01938dfffc8a88d3f9c880b18227cd6307ad8370');
};
