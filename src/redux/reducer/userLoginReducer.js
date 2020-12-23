import * as actions from '../action/loginAction/actionTypes';

const initalState = {
    user: JSON.parse(localStorage.getItem('user')),
    authError: null,
}

export default function userLoginReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case actions.LOG_IN_SUCCESS:return{...state, authError: null};
        case actions.LOG_IN_FAILURE:return{...state, authError: payload};
        case actions.LOG_OUT:return{...state, authError:null};
        default: return state;
    }
}