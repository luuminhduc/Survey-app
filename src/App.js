import React from 'react';
import { Provider, useSelector } from 'react-redux';
import Home from './pages/Home';
import store from './redux/store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import AddSurveyPage from './pages/AddSurveyPage';
import Surveys from './pages/Surveys';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import firebaseConfig from './firebase/config';
import firebase from 'firebase';
import BigLoading from './components/BigLoading';
import AlertList from './components/AlertList';
import SurveyItemPage from './pages/SurveyItemPage';
import SurveyItemResult from './pages/SurveyItemResult';
import EditSurvey from './pages/EditSurvey';


const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  }

  const AuthIsLoaded = ({children}) => {
    const auth = useSelector(state=>state.firebaseReducer.auth);
    if(!isLoaded(auth)) return <BigLoading status={true}/>
    return children;
  }

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <AuthIsLoaded>
        <Header/>
        <BigLoading/>
        <AlertList/>
<Switch>
  <Route path="/" exact>
  <Home/>
  </Route>
  <Route path="/register" exact>
  <Register/>
  </Route>
  <Route path="/login" exact>
  <Login/>
  </Route>
  <Route path="/addSurvey" exact>
  <AddSurveyPage/>
  </Route>
  <Route path="/surveys" exact>
  <Surveys/>
  </Route>
  <Route path="/surveys/:surveyItemId" exact>
  <SurveyItemPage/>
  </Route>
  <Route path="/surveys/result/:surveyItemResultId" exact>
  <SurveyItemResult/>
  </Route>
  <Route path="/surveys/edit/:editId" exact>
  <EditSurvey/>
  </Route>
</Switch>
        </AuthIsLoaded>
      </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
 
export default App;
