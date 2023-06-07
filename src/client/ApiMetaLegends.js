import axios from 'axios';
const apiUrl = process.env.REACT_APP_ML_API_URL;
const apiKey = process.env.REACT_APP_ML_API_KEY;

const buildHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  const headers = { 'x-api-key': apiKey }
  if (user != null) {
    headers['Authorization'] = `Bearer ${user.jwt}`;
  }

  return headers;
}

const get = async (url) => {
  try {
    return await axios({
      method: 'get',
      url: url,
      headers: buildHeader(),
    });
  } catch (error) {
    console.log(error)
  }
}

const patch = async (url, payload) => {
  try {
    return await axios({
      method: 'patch',
      url: url,
      headers: buildHeader(),
      data: payload
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

export const isHolder = async (address) => {
  const url = `${apiUrl}users/${address}/is-holder`;
  return get(url);
}

export const getMintOrderOgPets = async () => {
  const url = `${apiUrl}mint-orders/og-pets`;
  return get(url);
}

export const patchMintOrdersOgPets = async (payload) => {
  const url = `${apiUrl}mint-orders/og-pets`;
  return patch(url, payload);
}
