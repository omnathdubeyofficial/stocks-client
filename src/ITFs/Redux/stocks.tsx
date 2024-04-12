import * as ActionTypes from './ActionTypes'

export const stocks = (state={

    isLoading:true,
    errMess:null,
    stocks:[]
},action:any) =>
{
    
    switch(action.type)
    {
        case ActionTypes.ADD_STOCKS:
        return {...state,isLoading:false,errMess:null,stocks:action.payload};


        default:
        return state;
    }
}