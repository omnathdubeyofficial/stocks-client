import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import formsReducer from './forms_reducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer,
  forms:formsReducer
});

export default rootReducer;