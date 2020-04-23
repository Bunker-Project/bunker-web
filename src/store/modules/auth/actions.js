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

export function signInFail(){
    return {
        type: "@auth/LOGIN_FAIL",
    }
}

//This is because after refreshing the page the value of the state is not set
export function setToken(token){
    return {
        type: "@auth/LOGIN_SUCCESS",
        payload: { token }
    }
}