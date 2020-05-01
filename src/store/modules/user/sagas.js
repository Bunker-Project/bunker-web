import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signUpSuccess, signUpFail } from './actions';
import { signInRequest } from '../auth/actions';
import { toast } from 'react-toastify';


export function* setUserInfo({ payload }) {
    const api = new Api({ isDev: true });
    
    try {
        let response = yield call(api.insert, { api: "users", data: payload.user });

        if (response.status === 201) {
            
            //Put sets the variable to the store
            yield put(signUpSuccess(response.data));

            yield put(signInRequest({
                username: response.data.username,
                password: response.data.passwordAsString
            }, payload.history));
        }else{
            
            if (response.data.toString().toLowerCase().includes("network error")) {
                toast.error("😔 Unable to connect with the server");
            } else {
                toast.error("😱 " + response.data);
            }
            yield put(signUpFail());
        }

    } catch (err) {
        
        if (err.toString().toLowerCase().includes("network error")) {
            toast.error("😔 Unable to connect with the server");
        }

        yield put(signUpFail());
    }
}

export default all([takeLatest("@user/SIGN_UP", setUserInfo)])