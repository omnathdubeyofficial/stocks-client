import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_PENDING,
  FETCH_MESSAGE
  
} from './actions/types';


const initialstate ={authenticated: false,authprocess:'done',authuser:{},errors:{}}

export default function(state = initialstate, action:any) {
  
  switch(action.type) {
    case AUTH_PENDING:

    return { ...state,errors: [], authenticated: false, authprocess : 'pending',authuser:{} }; 
    case AUTH_USER:
 
      return { ...state,authenticated: true ,authprocess : 'done',authuser:action.payload };
    case UNAUTH_USER:
   // console.log('AUTH_USER 1011')
      return { ...state,errors: [], authenticated: false , authprocess : 'done',authuser:{} };
    case AUTH_ERROR:
      //console.log('AUTH_ERROR 1234')
      return { ...state, errors: action.payload , authenticated: false , authprocess : 'done',authuser:{}} ;
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
      default:
      return state;
  }
  //console.log('auth state');
  //console.log(state);
 
}
