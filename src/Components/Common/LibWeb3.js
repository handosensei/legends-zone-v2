import Web3 from "web3";

export const getWeb3Data = async (contract, chainId) => {
  const web3 = new Web3(window.ethereum);
  const networkId = await web3.eth.net.getId();
  const accounts = await web3.eth.getAccounts();
  if (networkId != chainId) {
    return [null, accounts[0]];
  }

  try {
    const contractDeployed = contract.networks[networkId];
    const instanceContract = new web3.eth.Contract(
      contract.abi,
      contractDeployed && contractDeployed.address
    );

    return [instanceContract, accounts[0]];
  } catch (error) {
    // Catch any errors for any of the above operations.
    console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
};

