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

const post = async (url, payload) => {
  try {
    return await axios({
      method: 'post',
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

export const getPerkArmors = async () => {
  const url = `${apiUrl}perk-armors`;
  return get(url);
}

export const getPerkOgPets = async () => {
  const url = `${apiUrl}perk-og-pets`;
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

export const upsertUser = async (address) => {
  const url = `${apiUrl}users/${address}`;
  return post(url, {});
}

export const updateUser = async (userId, payload) => {
  const url = `${apiUrl}users/${userId}`;
  return patch(url, payload);
}

export const holdingRewardEstimate = async () => {
  const url = `${apiUrl}holding-rewards/estimate`;
  return post(url, {});
}

export const getHoldingRewardsSaved = async () => {
  const url = `${apiUrl}holding-rewards`;
  return get(url);
}

export const getHonoraries = () => {
  const url = `${apiUrl}honoraries`;
  return get(url);
}

export const getCouncilStones = () => {
  const url = `${apiUrl}council-stones`;
  return get(url);
}

export const getUniversalWeaponSkins = () => {
  const url = `${apiUrl}weapon-skins`;
  return get(url);
}

export const getLZAssets = async () => {
  const url = `${apiUrl}lz-assets`;
  return get(url);
}

export const getHealingDrones = async () => {
  const url = `${apiUrl}healing-drones`;
  return get(url);
}

export const getVehicles = async () => {
  const url = `${apiUrl}vehicles`;
  return get(url);
}

export const getResidences = async () => {
  const url = `${apiUrl}residences`;
  return get(url);
}

export const usernameIsAvailable = async (username) => {
  const url = `${apiUrl}users/username/${username}/is-available`;
  return get(url);
}

export const emailIsAvailable = async (email) => {
  const url = `${apiUrl}users/email/${email}/is-available`;
  return get(url);
}

export const getItemsFromByCollection = async (blockchain, network, collection) => {
  const url = `${apiUrl}collections/owned/${blockchain}/${network}/${collection}`;
  return get(url);
}
