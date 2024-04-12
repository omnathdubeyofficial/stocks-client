import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {configs} from './configs'
import {documents } from './documents';
import {users } from './users';
import {stocks } from './stocks';
import {currentdocument} from './currentdocument'
import authReducer from './reducers/auth_reducer';
import formsReducer from './reducers/forms_reducer';
import { routerReducer } from 'react-router-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const config={
    key:'root',
    storage,
    debug:false,
    stateReconciler: autoMergeLevel2,
    blacklist: ['currentdocument']
}
export const store = createStore(

persistCombineReducers(config,{
    documents,
    auth: authReducer,
    users: users,
    stocks:stocks,
    router: routerReducer,
    forms:formsReducer,
    configs,
    currentdocument
     }),

//applyMiddleware(thunk,logger)
applyMiddleware(thunk)
);

export const ConfigureStore = () =>{
const persistor = persistStore(store)
return { persistor, store };
}