export function signUp(user, history) {
    return {
        type: "@user/SIGN_UP",
        payload: { user, history }
    }
}

export function signUpSuccess(user) {
    return {
        type: "@user/SIGN_UP_SUCCESS",
        payload: { user }
    }
}

export function signUpFail(){
    return {
        type: "@user/SIGN_UP_FAIL",
    }
}