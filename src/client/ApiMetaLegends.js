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
    return await axios({
      method: 'get',
      url: getUrlRewardsEstimate(address),
      headers: { 'x-api-key': apiKey }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getLegends = async (address) => {
  try {
    return await axios({
      method: 'get',
      url: getUrlLegends(address),
      headers: { 'x-api-key': apiKey }
    });
  } catch (error) {
    console.log(error)
  }
}
