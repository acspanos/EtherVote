const main = async () => {

  // const buffer = await hre.ethers.getContractFactory("Buffer");
  // const bufferLib = await buffer.deploy();
  // await bufferLib.deployed();
  // console.log("Buffer library deployed to:", bufferLib.address);
  
  // const cbor = await hre.ethers.getContractFactory("CBOR");
  // const cborLib = await cbor.deploy();
  // await cborLib.deployed();
  // console.log("CBOR library deployed to:", cborLib.address);
  
  // const provableI = await hre.ethers.getContractFactory("ProvableI");
  // const provableInterface = await provableI.deploy();
  // await provableInterface.deployed();
  // console.log("ProvableI interface deployed to:", provableInterface.address);
  
  // const oracleAddrResolverI = await hre.ethers.getContractFactory("OracleAddrResolverI");
  // const oracleAddrResolverInterface = await oracleAddrResolverI.deploy();
  // await oracleAddrResolverInterface.deployed();
  // console.log("OracleAddrResolverI interface deployed to:", oracleAddrResolverInterface.address);
  
  //const usingProvable = await hre.ethers.getContractFactory("usingProvable" );
  // , {
  //   libraries: {
  //     Buffer: bufferLib.address,
  //     CBOR: cborLib.address
  //   },
  // });
  //const provableAPI = await usingProvable.deploy(oracleAddrResolverInterface.address);
  // const provableAPI = await usingProvable.deploy();
  // await provableAPI.deployed();
  // console.log("UsingProvable contract deployed to:", provableAPI.address);



  // const usingProvable = await hre.ethers.getContractFactory("usingProvable");
  // const provableAPI = await usingProvable.deploy();

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  
  console.log('Starting');
  // await provableAPI.deployed();
  await voting.deployed();
  console.log('Ended');
  // console.log("ProvableAPI deployed to:", provableAPI.address);
  console.log("Voting deployed to:", voting.address);

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
