import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/LOGIN_REQUEST':
                console.tron.log("Is requesting login");
                console.log(action);
                console.log(state);
                console.log(draft);
                break;
            case "SIGNINGIN":
                console.tron.log("Is signing in, wait for it");
                break;
            default:
                return { ...state };
        }
    });
}