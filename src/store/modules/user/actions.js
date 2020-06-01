import Actions from "../../enums"

export function signUp(user, history) {
    return {
        type: Actions.USER.SIGN_UP,
        payload: { user, history }
    }
}

export function signUpSuccess(user) {
    return {
        type: Actions.USER.SIGN_UP_SUCCESS,
        payload: { user }
    }
}

export function signUpFail(){
    return {
        type: Actions.USER.SIGN_UP_FAIL,
    }
}