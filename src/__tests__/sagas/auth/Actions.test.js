import {
    signInRequest, signInSuccess, signInFail,
    setRefreshToken, logout
} from '../../../store/modules/auth/actions';

const default_user = {
    "username": "test",
    "password": "test123"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFhYWQ2MWQ2LTUwMTEtNDEyNi04NmZhLWZlNWNjMDhjMTk5NyIsIm5iZiI6MTU4OTgzODAzNiwiZXhwIjoxNTg5OTI0NDM2LCJpYXQiOjE1ODk4MzgwMzZ9.dYawPPqG2GVkSNPQSzl1TmTkM4OHmgQjAWnNf0e8b1Q';

test('test signInRequest', () => {
    let response = signInRequest(default_user, null);

    expect(response.type).toBe('@auth/LOGIN_REQUEST');
    expect(response.payload.history).toBeNull();
    expect(response.payload.user).toStrictEqual(default_user);
});

test('test signInSuccess', () => {
    let response = signInSuccess(token);

    expect(response.type).toBe('@auth/LOGIN_SUCCESS');
    expect(response.payload.tokenData).toBe(token);
});

test('test signInFail', () => {
    let response = signInFail();

    expect(response.type).toBe('@auth/LOGIN_FAIL');
});

test('test setToken', () => {
    let response = setRefreshToken(token)

    expect(response.type).toBe('@auth/LOGIN_SUCCESS');
    expect(response.payload.tokenData).toBe(token);
});

test('test logout', () => {
    let response = logout(null)

    expect(response.type).toBe('@auth/LOGOUT');
    expect(response.payload.history).toBeNull();
});
