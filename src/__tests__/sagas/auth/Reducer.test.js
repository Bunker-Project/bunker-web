import auth from '../../../store/modules/auth/reducer';
import {
    signInSuccess, signInFail
} from '../../../store/modules/auth/actions';

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFhYWQ2MWQ2LTUwMTEtNDEyNi04NmZhLWZlNWNjMDhjMTk5NyIsIm5iZiI6MTU4OTgzODAzNiwiZXhwIjoxNTg5OTI0NDM2LCJpYXQiOjE1ODk4MzgwMzZ9.dYawPPqG2GVkSNPQSzl1TmTkM4OHmgQjAWnNf0e8b1Q';

test('test login request', () => {
    let response = auth(INITIAL_STATE, '@auth/LOGIN_REQUEST');

    expect(response.token).toBeNull();
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeFalsy();
});

test('test login sucess', () => {
    //Creates the action that contains the values used by the reducer
    let action = signInSuccess(token);

    let response = auth(INITIAL_STATE, action);

    expect(response.token).toBe(token);
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeTruthy();
});

test('test login fail', () => {
    //Creates the action that contains the values used by the reducer
    let action = signInFail(token);

    let response = auth(INITIAL_STATE, action);

    expect(response.token).toBeNull();
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeFalsy();
});

test('test default behaviour', () => {
    //If a value that is not in the switch is sent, it should return the INITIAL STATE
    let response = auth(INITIAL_STATE, '');

    expect(response).toStrictEqual(INITIAL_STATE);
});
