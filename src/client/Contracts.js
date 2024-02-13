import MetaLifeLZReward from "../contracts/mainnet/lz-rewards/LegendsZoneRewards.json";
import MetaLifeHealingDrone from "../contracts/mainnet/healing-drone/MetaLifeHealingDrone.json";
import Web3 from "web3";

const NETWORK_ETHEREUM = 1;
const NETWORK_POLYGON = 137;

export const getContractHoldingRewards = async () => {
  const web3 = new Web3(window.ethereum);

  try {
    const contractDeployed = MetaLifeLZReward.networks[NETWORK_POLYGON];
    return new web3.eth.Contract(MetaLifeLZReward.abi, contractDeployed && contractDeployed.address);
  } catch (error) {
    console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
}

export const getContractHealingDrone = async () => {
  const web3 = new Web3(window.ethereum);

  try {
    const contractDeployed = MetaLifeHealingDrone.networks[NETWORK_POLYGON];
    return new web3.eth.Contract(MetaLifeHealingDrone.abi, contractDeployed && contractDeployed.address);
  } catch (error) {
    console.log(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
}
