import *  as actions from '../action/surveyAction/actionTypes';

const initalState = {
    surveyList: [],
    surveyItem:null,
    searchTerm:''
}

export default function surveyReducer(state = initalState, action) {
    const {payload, type} = action;
    switch(type) {
        case actions.GET_ALL_SURVEYS: return {...state, surveyList: payload};
        case actions.GET_SURVEY: return{...state, surveyItem: payload};
        case actions.UPDATE_SEARCH_TERM: return {...state, searchTerm: payload};
        default: return state;
    }
}