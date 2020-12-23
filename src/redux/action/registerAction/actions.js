import * as actions from './actionTypes';
import {handleAlert, hideLoading, showLoading} from '../CommonAction/actions';

const registerUserRequest = (user) => (dispatch,getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading());
    dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: user,  
    })
    const firebase = getFirebase();
    const fireStore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
        user.email,
        user.password,
    ).then(res => {
        return fireStore.collection("users").doc(res.user.uid).set({
            score:0,
        })
    }).then(() => {
        dispatch({
            type: actions.REGISTER_SUCCESS,
        })
        dispatch(handleAlert({text: "Register is successful", severity:"success", id:Math.random()}))
        dispatch(hideLoading());

    }).catch(err => {
        console.log(err);
        dispatch({
            type: actions.REGISTER_ERROR,
            payload: err,
        })
        dispatch(hideLoading());

    })
}



export {registerUserRequest}