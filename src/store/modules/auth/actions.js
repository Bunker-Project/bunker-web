import Actions from "../../enums";

export function signInRequest(user, history) {
    return {
        type: Actions.AUTH.LOGIN_REQUEST,
        payload: { user, history },
    };
}

export function signInSuccess(token, user) {
    return {
        type: Actions.AUTH.LOGIN_SUCCESS,
        payload: { token, user }
    }
}

export function signInFail() {
    return {
        type: Actions.AUTH.LOGIN_FAIL,
    }
}

//This is because after refreshing the page the value of the state is not set
export function setToken(token) {
    return {
        type: Actions.AUTH.LOGIN_SUCCESS,
        payload: { token }
    }
}

export function logout(history) {
    return {
        type: Actions.AUTH.LOGOUT,
        payload: { history }
    }
}