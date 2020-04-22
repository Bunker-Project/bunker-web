import { all, call, takeLatest, takeEvery } from 'redux-saga/effects';
import Api from '../../../Api';

export function* signIn({ payload }) {
    // const {username, password} = payload;
    try {
        const api = new Api({ isDev: true });

        const history = payload.history;

        const response = yield call(api.login, payload.user);

        const token = response.data;

        if (response.status === 200)
            history.push('/home');

    }
    catch (err) {
        console.tron.log("The error is: " + err);
    }

}

export default all([takeLatest('@auth/LOGIN_REQUEST', signIn)]);