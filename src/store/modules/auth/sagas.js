import { all, call, takeLatest } from 'redux-saga/effects';
import Api from '../../../Api';

export function* auth({ payload }) {
    // const {username, password} = payload;
    try {
        console.tron.log("Starting saga.js");
        const api = new Api({ isDev: true });
        console.tron.log("the payload is: " + payload);
        console.tron.log("Calling login");
        const response = yield call(api.login, payload);

        const token = response.data;
    }
    catch (err) {
            console.tron.log("The error is: " + err);
        }

    }

export default (all([takeLatest('CREDENTIALS', auth)]));