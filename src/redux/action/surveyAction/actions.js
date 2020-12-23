import { handleAlert, hideLoading, showLoading } from '../CommonAction/actions';
import * as actions from './actionTypes';

const addSurvey = (survey, history) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading());
    const firestore = getFirestore();
    console.log(survey);
    firestore.collection("surveys").add(survey).then(() => {
        dispatch({
            type: actions.ADD_SURVEY,
            payload: survey,
        })
        dispatch(handleAlert({text: "A survey is added", severity:"success", id:Math.random()}))
        dispatch(hideLoading());
    }).catch(err => {
        dispatch(hideLoading());
        dispatch(handleAlert({text: err.message, severity:"error", id:Math.random()}))
        history.push('/');
    });
}

const getAllSurvey = () => (disaptch,getState, {getFirestore}) => {
    const fireStore = getFirestore();
    fireStore.collection("surveys").orderBy("time", "desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id: item.id}));
        disaptch({
            type: actions.GET_ALL_SURVEYS,
            payload: docs,
        })
    })
    
}

const getSurvey = (id) => (dispatch, getState, {getFirestore}) => {
    const fireStore = getFirestore();
    fireStore.collection('surveys').doc(id).get().then((doc) => {
        if(doc.exists) {
            dispatch({
                type: actions.GET_SURVEY,
                payload: {...doc.data(), id: doc.id}
            })
        }else{
           console.log("No");
        }
    }).catch(err => {
        dispatch(handleAlert({text: err.message, severity:"error",id:Math.random()}))
    })
}

const updateSurvey = (survey, history) => (dispatch, getState, {getFirestore}) => {
    dispatch(showLoading());
    const fireStore = getFirestore();
    fireStore.collection('surveys').doc(survey.id).set({...survey}).then(() => {
        dispatch(hideLoading());
        history.push('/surveys');
    }).catch(err => {
        dispatch(hideLoading())
        console.log(err);
    })
}

const updateSearchTerm = (term) => {
    return{
        type: actions.UPDATE_SEARCH_TERM,
        payload: term,
    }
}

export {addSurvey, getAllSurvey, getSurvey, updateSurvey, updateSearchTerm};