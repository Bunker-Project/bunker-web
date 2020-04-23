import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signInSuccess, setToken, signInFail } from './actions';
import { toast } from 'react-toastify';

export function* signIn({ payload }) {
    try {
        const api = new Api({ isDev: true });

        const history = payload.history;

        const response = yield call(api.login, payload.user);

        if (response.status === 200) {
            const token = response.data;
            console.log(response);
            if (token !== null) {
                yield put(signInSuccess(token));
                history.push('/home');
            }
        } else {
            toast.error("😱 " + response.data);
            yield put(signInFail());
        }

    }
    catch (err) {
        console.log(err);
        if (err.toString().toLowerCase().includes("network error")) {
            toast.error("😔 Unable to connect with the server");
        }

        yield put(signInFail());
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