import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
    profile: null
}

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case "@user/SIGN_UP":
                draft.loading = true;
                break;
            case "@user/SIGN_UP_SUCCESS":
                draft.profile = action.payload.user;
                draft.loading = false;
                break;
            case "@user/SIGN_UP_FAIL":
                draft.profile = null;
                draft.loading = false;
                break;
            default:
                return { ...state };
        }
    })
}