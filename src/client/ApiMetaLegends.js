import axios from 'axios';
const apiUrl = process.env.REACT_APP_ML_API_URL;
const apiKey = process.env.REACT_APP_ML_API_KEY;

const get = async (url) => {
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  try {
    return await axios({
      method: 'get',
      url: url,
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${user.jwt}` }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getRewardsEstimate = async () => {
  const url = `${apiUrl}rewards`;
  return get(url);
}

export const getLegends = async () => {
  const url = `${apiUrl}legends`;
  return get(url);
}

export const getEligibilityOgPets = async () => {
  const url = `${apiUrl}eligibility/og-pets`;
  return get(url);
}

export const isHolder = async () => {
  const url = `${apiUrl}users/is-holder`;
  return get(url);
}

export const getMintOrderOgPets = async () => {
  const url = `${apiUrl}mint-orders/og-pets`;
  return get(url);
}
