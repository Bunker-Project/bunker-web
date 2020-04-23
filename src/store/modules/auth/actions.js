export function signInRequest(user, history) {
    return {
        type: '@auth/LOGIN_REQUEST',
        payload: { user, history },
    };
}

export function signInSuccess(token) {
    return {
        type: "@auth/LOGIN_SUCCESS",
        payload: { token }
    }
}