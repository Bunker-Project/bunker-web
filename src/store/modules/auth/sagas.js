import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signInSuccess, setToken, signInFail } from './actions';
import { toast } from 'react-toastify';
import Actions from '../../enums';
import { v4 as uuidv4 } from 'uuid';

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

        const token = payload.auth.token;

        if (token !== null && token !== undefined) {
            if (token.authenticated){
                yield put(setToken(token));
            }
        }
        else
            yield put(signInFail());
    }
}

export function* logout({ payload }) {
    payload.history.push('/');
    toast.info("Bye! See you soon 😉!!!");
}

export default all([
    takeLatest(Actions.AUTH.LOGIN_REQUEST, signIn),
    takeLatest('persist/REHYDRATE', rehydrate),
    takeLatest(Actions.AUTH.LOGOUT, logout)]);