import {
  ML_STAKED_LOADING,
  ML_STAKED_SUCCESS,
  ML_STAKED_ERROR,
} from "./actionType";

export const stakedLoading = () => {
  return {
    type: ML_STAKED_LOADING
  }
}

export const stakedSuccess = tokenIdsStaked => {
  return {
    type: ML_STAKED_SUCCESS,
    payload: tokenIdsStaked,
  }
}

export const stakedError = msg => {
  return {
    type: ML_STAKED_ERROR,
    payload: msg,
  }
}
