var waterLicense = artifacts.require("./WaterLicense.sol");

module.exports = function(deployer) {
  deployer.deploy(waterLicense);
};
