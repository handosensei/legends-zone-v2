import axios from 'axios';
const apiUrl = process.env.REACT_APP_ML_API_URL;
const apiKey = process.env.REACT_APP_ML_API_KEY;

const getUrlRewardsEstimate = (address) => {
  return `${apiUrl}rewards/${address}/estimate`;
}

const getUrlLegends = (address) => {
  return `${apiUrl}Legends/${address}`;
}

export const getRewardsEstimate = async (address) => {
  try {
    const fake = '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd';
    return await axios({
      method: 'get',
      // url: getUrlTokenRewardsGet(address),
      url: getUrlRewardsEstimate(fake),
      headers: { 'x-api-key': apiKey }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getLegends = async (address) => {
  try {
    const fake = '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd';
    return await axios({
      method: 'get',
      // url: getUrlTokenRewardsGet(address),
      url: getUrlLegends(fake),
      headers: { 'x-api-key': apiKey }
    });
  } catch (error) {
    console.log(error)
  }
}
