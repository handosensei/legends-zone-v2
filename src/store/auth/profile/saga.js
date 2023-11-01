import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";

import {updateUser} from "../../../client/ApiMetaLegends";

function* editProfile({ payload: { user } }) {
  try {
    const response = yield call(updateUser, user.id, user);
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    authUser.user = user;
    sessionStorage.setItem("authUser", JSON.stringify(authUser));
    yield put(profileSuccess(response));
  } catch (error) {
    yield put(profileError(error));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
