import * as ActionTypes from './ActionTypes'

export const users = (state={

    isLoading:true,
    errMess:null,
    users:[]
},action) =>
{
    
    switch(action.type)
    {
        case ActionTypes.ADD_USERS:
        return {...state,isLoading:false,errMess:null,users:action.payload};

        case ActionTypes.LOADING_USERS:
        return {...state,isLoading:true,errMess:null,users:[]};
    
        case ActionTypes.FAILED_USERS:
        return {...state,isLoading:false,errMess:action.payload,users:[]};

        default:
        return state;
    }
}
