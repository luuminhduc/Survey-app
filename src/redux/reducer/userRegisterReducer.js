import * as actions from '../action/registerAction/actionTypes';

const initalState = {
    error: null,
}

export default function userRegisterReducer(state = initalState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.REGISTER_SUCCESS: return{...state, error:null};
        case actions.REGISTER_ERROR:return{...state, error:payload};
        default: return state;
    }
}