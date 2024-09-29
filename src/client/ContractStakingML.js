import contract from "../contracts/testnet/staking-ml/MetaLifeStaking.json";
import {getWeb3Data} from "../Components/Common/LibWeb3";

const CHAIN_ID = process.env.REACT_APP_STAKING_CHAIN_ID;

const loadContract = () => {
  return getWeb3Data(contract, CHAIN_ID)
}

export const getTokenStakedByOwner = async () => {
  const res = await loadContract();
  const contract = res[0];
  const account = res[1];
  return await contract.methods.tokenStakedByOwner(account).call()
}
