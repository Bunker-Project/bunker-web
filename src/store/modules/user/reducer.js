import produce from 'immer';
import Actions from '../../enums';

const INITIAL_STATE = {
    loading: false,
    profile: null
}

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Actions.USER.SIGN_UP:
                draft.loading = true;
                break;
            case Actions.USER.SIGN_UP_SUCCESS:
                // draft.profile = action.payload.user;
                draft.loading = false;
                break;
            // case Actions.AUTH.LOGIN_SUCCESS:
            //     draft.profile = action.payload.user;
            //     draft.loading = false;
            //     break;
            case Actions.USER.SIGN_UP_FAIL:
                draft.profile = null;
                draft.loading = false;
                break;
            default:
                return { ...state };
        }
    })
}