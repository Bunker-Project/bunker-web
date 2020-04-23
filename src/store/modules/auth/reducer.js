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
                draft.loading = true;
                break;
            case "@auth/LOGIN_SUCCESS":
                draft.loading = false;
                draft.token = action.payload.token;
                draft.signed = true;
                break;
            case "@auth/LOGIN_FAIL":
                draft.loading = false;
                break;
            default:
                return { ...state };
        }
    });
}