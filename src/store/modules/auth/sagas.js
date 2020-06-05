import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signInSuccess, setRefreshToken, signInFail } from './actions';
import { toast } from 'react-toastify';
import Actions from '../../enums';
import { v4 as uuidv4 } from 'uuid';
import { setTokenInfo } from '../../../config/AccessTokenInfo';

export function* signIn({ payload }) {
    try {
        const api = new Api();

        const history = payload.history;

        var newUser = {
            id: uuidv4(),
            username: payload.user.username,
            password: payload.user.password,
            refreshToken: '',
            grantType: "password"
        };

        const response = yield call(api.login, newUser);

        if (!response.hasOwnProperty('hasError') && response.status === 200) {
            const token = response.data;

            if (token !== null) {
                yield put(signInSuccess(token));
                setTokenInfo(token);
                toast.success("😀 Welcome!!");
                history.push('/home');
            }
        } else {
            if (response.data.toString().toLowerCase().includes("network error")) {
                toast.error("😔 Unable to connect with the server");
            } else {
                toast.error("😱 " + response.data);
            }
            yield put(signInFail());
        }

    }
    catch (err) {

        if (err.toString().toLowerCase().includes("network error")) {
            toast.error("😔 Unable to connect with the server");
        }

        yield put(signInFail());
    }
}

export function* rehydrate({ payload }) {
    if (payload !== undefined) {//This is necessary because jest enters here and throws an exception

        const { refreshToken, signed } = payload.auth;

        if (refreshToken) {
            if (signed)
                yield put(setRefreshToken(payload.auth));
        }
        else
            yield put(signInFail());
    }
}

export function* logout({ payload }) {
    payload.history.push('/');
    yield put(toast.info, "Bye! See you soon 😉!!!");
}

export default all([
    takeLatest(Actions.AUTH.LOGIN_REQUEST, signIn),
    takeLatest('persist/REHYDRATE', rehydrate),
    takeLatest(Actions.AUTH.LOGOUT, logout)]);