import produce from 'immer';
import Actions from '../../enums';

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case Actions.AUTH.LOGIN_REQUEST:
                draft.loading = true;
                draft.signed = false;
                break;
            case Actions.AUTH.LOGIN_SUCCESS:
                draft.loading = false;
                draft.token = action.payload.tokenData;
                draft.signed = true;
                break;
            case Actions.AUTH.LOGIN_FAIL:
                draft.loading = false;
                draft.signed = false;
                draft.token = null;
                break;
            case Actions.AUTH.LOGOUT:
                draft.loading = false;
                draft.signed = false;
                draft.token = null;
                break;
            default:
                return { ...state };
        }
    });
}