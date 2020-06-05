import auth from '../../../store/modules/auth/reducer';
import {
    signInSuccess, signInFail
} from '../../../store/modules/auth/actions';

const INITIAL_STATE = {
    refreshToken: null,
    id: null,
    signed: false,
    loading: false
};

const token = '99415b0490cd4591862caef8850f6e5a';

test('test login request', () => {
    let response = auth(INITIAL_STATE, '@auth/LOGIN_REQUEST');

    expect(response.refreshToken).toBeNull();
    expect(response.id).toBeNull();
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeFalsy();
});

test('test login success', () => {

    let tokenData = {
        refreshToken: token,
        id: 'c702eb0b-9541-4f03-9993-3f6bf9a2e49b',
        signed: true,
        loading: false
    }

    //Creates the action that contains the values used by the reducer
    let action = signInSuccess(tokenData);

    let response = auth(INITIAL_STATE, action);

    expect(response.refreshToken).toBe(token);
    expect(response.id).toBe('c702eb0b-9541-4f03-9993-3f6bf9a2e49b');
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeTruthy();
});

test('test login fail', () => {
    //Creates the action that contains the values used by the reducer
    let action = signInFail(token);

    let response = auth(INITIAL_STATE, action);

    expect(response.refreshToken).toBeNull();
    expect(response.id).toBeNull();
    expect(response.loading).toBeFalsy();
    expect(response.signed).toBeFalsy();
});

test('test default behaviour', () => {
    //If a value that is not in the switch is sent, it should return the INITIAL STATE
    let response = auth(INITIAL_STATE, '');

    expect(response).toStrictEqual(INITIAL_STATE);
});
