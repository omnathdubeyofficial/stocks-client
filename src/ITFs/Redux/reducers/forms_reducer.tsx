import {
   FORM_ERROR,
   CLEAR_FORM_ERROR
    
    
  } from './actions/types';
  

//const ErrorInitialState = { Signin:[] , Signup:[] }
const ErrorInitialState = { form_errors : []} ;
 export default function(state = ErrorInitialState, action:any) {
  //  console.log(action.type );
 //   console.log( action.payload);
    switch(action.type) {
     case CLEAR_FORM_ERROR:
     return { form_errors : ClearErrorList(state.form_errors,action.payload) };   
      case FORM_ERROR:
     return { form_errors : AppendErrorList(state.form_errors,action.payload)} ;
     }
   /// console.log('form_reducers' );
   /// console.log( state );
    return state;
  }
  


  
function AppendErrorList(statex:any,form_errorx:any)
{
    var isMatch =false;

    for(var i=0; i<statex.length; i++) {
        if (statex[i].formname==form_errorx.formname )
        {isMatch=true;
        statex[i].errors=[...statex[i].errors,...form_errorx.errors];
        }
    }

    if(!isMatch) statex= [...statex,form_errorx]
    return statex;
}

function ClearErrorList(statex:any,form_errorx:any)
{
    for(var i=0; i<statex.length; i++) {
     //   console.log(statex[i].formname);
     //   console.log( statex[i].errors.length);
        if (statex[i].formname===form_errorx.formname )
        {
                while(statex[i].errors.length)
                 { statex[i].errors.pop();
          //          console.log( statex[i].errors.length);
                 }
        }
    }
    //console.log(statex)
    return statex;
}