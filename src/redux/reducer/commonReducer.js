import * as actions from '../action/CommonAction/actionTypes';

const initalState = {
    alertList:[],
    loading: false,
}

export default function commonReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type) {
        case actions.ADD_ALERT: return {...state, alertList:[...state.alertList, payload]};
        case actions.REMOVE_ALERT:return {...state, alertList:[...state.alertList].filter(el => el.id !== payload)}
        case actions.SHOW_LOADING: case actions.HIDE_LOADING: return{...state,loading: payload};
        default: return state
    }
}