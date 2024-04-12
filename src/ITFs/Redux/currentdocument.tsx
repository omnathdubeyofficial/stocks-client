import * as ActionTypes from './ActionTypes'

export const currentdocument = (state={
    isLoading:true,
    errMess:null,
    currentdocument:{}
    

},action) =>
{
    switch(action.type)
    {

        
        
          case ActionTypes.MODIFY_DOCUMENT:
          return {...state,errMess:null,currentdocument:action.payload};

        //   case ActionTypes.SET_CURRENTCOMPANY:
        //   return {...state,errMess:null,currentdocument:newInvoiceDocument(action.payload)};

        default:
        return state;

    }
}