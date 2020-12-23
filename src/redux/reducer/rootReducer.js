import {combineReducers} from 'redux';
import userLoginReducer from './userLoginReducer';
import surveyReducer from './surveyReducer';
import {firebaseReducer} from 'react-redux-firebase'
import userRegisterReducer from './userRegisterReducer';
import commonReducer from './commonReducer';
export default combineReducers({
    userLoginReducer,
    surveyReducer,
    userRegisterReducer,
    firebaseReducer,
    commonReducer,
})