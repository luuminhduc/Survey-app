import { handleAlert, hideLoading, showLoading } from '../CommonAction/actions';
import * as actions from './actionTypes';

const loginUserRequest = (credentials, history) => (dispatch, getState, {getFirebase}) => {
    dispatch(showLoading());
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
    ).then(() => {
        dispatch({
            type:actions.LOG_IN_SUCCESS,
        });
        dispatch(hideLoading());
        dispatch(handleAlert({text: "You are now log in", severity:"success", id:Math.random()}));
        history.goBack();
    }).catch(err => {
        dispatch(hideLoading());

        console.log(err);
        dispatch({
            type: actions.LOG_IN_FAILURE,
            payload:err,
        })
    })
}

const logOut = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
        dispatch({
            type:actions.LOG_OUT,
        })
        dispatch(handleAlert({text: "You are now log out", severity:"success", id:Math.random()}));

    })
}

export {loginUserRequest, logOut};