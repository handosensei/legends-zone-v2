import axios from 'axios';
const apiUrl = process.env.REACT_APP_ML_API_URL;
const apiKey = process.env.REACT_APP_ML_API_KEY;

const getUrlRewardsEstimate = () => {
  return `${apiUrl}rewards`;
}

const getUrlLegends = () => {
  return `${apiUrl}legends`;
}

const getUrlEligibilityOgPet = () => {
  return `${apiUrl}eligibility/og-pets`;
}

export const getRewardsEstimate = async () => {
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  try {
    return await axios({
      method: 'get',
      url: getUrlRewardsEstimate(),
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${user.jwt}` }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getLegends = async () => {
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  try {
    return await axios({
      method: 'get',
      url: getUrlLegends(),
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${user.jwt}` }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getEligibilityOgPets = async () => {
  const user = JSON.parse(sessionStorage.getItem("authUser"));
  try {
    return await axios({
      method: 'get',
      url: getUrlEligibilityOgPet(),
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${user.jwt}` }
    });
  } catch (error) {
    console.log(error)
  }
}
