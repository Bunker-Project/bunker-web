export function signInRequest(user, history) {
    return {
        type: '@auth/LOGIN_REQUEST',
        payload: { user, history },
    };
}