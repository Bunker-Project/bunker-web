import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signInSuccess, setToken } from './actions';

export function* signIn({ payload }) {
    try {
        const api = new Api({ isDev: true });

        const history = payload.history;

        const response = yield call(api.login, payload.user);

        const token = response.data;

        if (token !== null) {
            yield put(signInSuccess(token));
            history.push('/home');
        }

    }
    catch (err) {
        // console.tron.log("The error is: " + err);
    }
}

export function* rehydrate({ payload }) {
    if (!payload)
        return;

    yield put(setToken(payload.auth.token));
}

export default all([
    takeLatest('@auth/LOGIN_REQUEST', signIn),
    takeLatest('persist/REHYDRATE', rehydrate)]);