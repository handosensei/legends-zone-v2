import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {ML_STAKED_ERROR, ML_STAKED_LOADING, ML_STAKED_SUCCESS} from "./actionType";
import { stakedSuccess, stakedError } from "./actions";

import {getTokenStakedByOwner} from "../../../client/ContractStakingML";

function* stakedLoading() {
  try {
    const tokenIdsStaked = yield call(getTokenStakedByOwner);
    yield put(stakedSuccess(tokenIdsStaked));
  } catch (error) {
    yield put(stakedError(error));
  }
}

export function* watchStakingML() {
  yield takeEvery(ML_STAKED_LOADING, stakedLoading);
  yield takeEvery(ML_STAKED_SUCCESS, stakedSuccess);
  yield takeEvery(ML_STAKED_ERROR, stakedError);
}

function* StakingMLSaga() {
  yield all([fork(watchStakingML)]);
}

export default StakingMLSaga;
