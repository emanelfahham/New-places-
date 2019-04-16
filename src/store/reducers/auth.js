import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from '../actions/types';

const initial_state = {
    token: null,
    expiryDate: null
};

const reducer = (state = initial_state, action) => {
    switch(action.type){
        case AUTH_SET_TOKEN:
        return {
            ...state,
            token: action.token,
            expiryDate: action.expiryDate
        };
        case AUTH_REMOVE_TOKEN:
        return {
            ...state,
            token: null,
            expiryDate: null
        }
        default:
        return state;
    }
};

export default reducer;