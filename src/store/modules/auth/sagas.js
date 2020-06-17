import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signInSuccess, setRefreshToken, signInFail } from './actions';
import Actions from '../../enums';
import { v4 as uuidv4 } from 'uuid';
import { setTokenInfo } from '../../../config/AccessTokenInfo';
import Toast from '../../../services/ToastService';

export function* signIn({ payload }) {
    let api = new Api();
    let toastService = new Toast();

    let history = payload.history;

    var newUser = {
        id: uuidv4(),
        username: payload.user.username,
        password: payload.user.password,
        refreshToken: '',
        grantType: "password"
    };

    let response = yield call(api.login, newUser);
    
    if (response.status === 200) {
        let token = response.data;

        if (token !== null) {
            yield put(signInSuccess(token));
            setTokenInfo(token);
            toastService.success("😀 Welcome!!")
            history.push('/home');
        }
    } else {
        toastService.error(response.message);
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
    let toastService = new Toast();
    payload.history.push('/');
    yield put(toastService.info, "Bye! See you soon 😉!!!");
}

export default all([
    takeLatest(Actions.AUTH.LOGIN_REQUEST, signIn),
    takeLatest('persist/REHYDRATE', rehydrate),
    takeLatest(Actions.AUTH.LOGOUT, logout)]);