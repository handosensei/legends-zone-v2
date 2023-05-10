import { put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER  } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

function* loginUser({ payload: { user, history } }) {
  try {
      yield put(loginSuccess(user));
      history('/dashboard')
      sessionStorage.setItem("authUser", JSON.stringify(user));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
