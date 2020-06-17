import { all, call, takeLatest, put } from 'redux-saga/effects';
import Api from '../../../Api';
import { signUpSuccess, signUpFail } from './actions';
import { signInSuccess } from '../auth/actions';
import Actions from '../../enums';
import Toast from '../../../services/ToastService';


export function* setUserInfo({ payload }) {
    let api = new Api();
    let toastService = new Toast();

    let response = yield call(api.insert, { api: "users", data: payload.user, isSignUp: true });

    if (response.status === 201) {

        //Put sets the variable to the store
        yield put(signUpSuccess(response.data));

        yield put(signInSuccess(response.data));

        toastService.success("😀 Welcome!!")

        payload.history.push('/home');
    } else {

        response.map(error => {
            return toastService.error(error.message);
        });
        
        yield put(signUpFail());
    }
}

export function* rehydrate({ payload }) {
    // console.tron.log(payload);
    // if (payload !== undefined) {//This is necessary because jest enters here and throws an exception
    //     console.log("Rehydrate was called");
    //     const token = payload.auth.token;

    //     if (token !== null)
    //         yield put(setToken(token));
    //     else
    //         yield put(signInFail());
    // }
}

export default all([
    takeLatest(Actions.USER.SIGN_UP, setUserInfo),
    takeLatest('persist/REHYDRATE', rehydrate)])