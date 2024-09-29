import {
  ML_STAKED_LOADING,
  ML_STAKED_SUCCESS,
  ML_STAKED_ERROR,
} from "./actionType";

const initialState = {
  error: null,
  success: null,
  tokenStaked: [],
}

const StakingMetaLegends = (state = initialState, action) => {
  switch (action.type) {
    case ML_STAKED_LOADING:
      state = {
        ...state,
        error: null,
        success: null,
      };
      break;
    case ML_STAKED_SUCCESS:
      state = {
        ...state,
        success: Array.isArray(action.payload) ,
        tokenStaked: action.payload
      };
      break;
    case ML_STAKED_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
}

export default StakingMetaLegends;
