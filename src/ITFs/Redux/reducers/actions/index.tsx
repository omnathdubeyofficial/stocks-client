import { browserHistory } from 'react-router-dom';
import { push } from 'react-router-redux';
import gql from "graphql-tag";
import SignOutUsername  from '../../../../common/mutations/signOutUsername';
import SignInUsername from '../../../../common/mutations/signInUsername';
import SignInUsernameJWT from '../../../../common/mutations/signInUsernameJWT';

import SignUpUsername from '../../../../common/mutations/signUpUsername';
import SignUpUsernameJWT from '../../../../common/mutations/signUpUsernameJWT';

import signUpMobileJWT from '../../../../common/mutations/signUpMobileJWT';
import verifyMobileOTPJWT from '../../../../common/mutations/verifyMobileOTPJWT';
import signInMobileJWT from '../../../../common/mutations/signInMobileJWT';


import CurrentUser from '../../../../common/queries/CurrentUser';
import CurrentUserJWT from '../../../../common/queries/CurrentUserJWT';
import usersQuery from '../../../../common/queries/usersQuery';
import newsQuery from '../../../../common/queries/stocksnews';
import recommendationQuery from '../../../../common/queries/recommendationQuery'

import {execGql,execGql_xx} from '../../../../common/gqlclientconfig'
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_PENDING ='AUTH_PENDING';
const FORM_ERROR = 'FORM_ERROR';
const CLEAR_FORM_ERROR = 'CLEAR_FORM_ERROR';
const SIGNUP_USERNAME='SIGNUP_USERNAME';
  const  values1 =
    {"applicationid": "15001500",
"client": "12341234",
"lang": "EN",
"username": "sachin@sachin.com.com",
"email": "sachin@kedar.com.com",
"password": "123",
"mobile" : "123445667"};

export function ActionToDispatch(action_to_dispatch:any)
{
return function(dispatch:any){
  console.log('dispatching ' );
  console.log(action_to_dispatch);
  dispatch(action_to_dispatch);

}

}


export function ActionToRedirect(url_path:any)
{
return function(dispatch:any){

  console.log(url_path);
  dispatch(push(url_path));

}

}

export async function getRecommendations(values:any) {
  var result:any = '', errorMessage = '', errors = new Array();
  try {
      result = await execGql('query', recommendationQuery, values)
  }
  catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {

      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];

      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
      //return result.data;
      return result.data.recommendations;
  }
}


export async function getUsers1(values:any) {
  var result:any = '', errorMessage = '', errors = new Array();
  try {
      result = await execGql('query', usersQuery, values)
  }
  catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {

      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];

      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
      //return result.data;
      return result.data.users;
  }
}


export async function getUsers2(values:any) {
  var result:any = '', errorMessage = '', errors = new Array();
  try {
      result = await execGql('query', newsQuery, values)
  }
  catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {

      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];

      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
      //return result.data;
      return result.data.stocknews;
  }
}

export async function handleSignIn(values:any,callback:any) {
 let result:any='',errorMessage='',errors =new Array();
try
{
  console.log('values******');
  console.log(values);
  console.log('values** end****');
  result= await execGql('mutation',SignInUsername,values)
 }
catch(err)
{  
   errors = err.errorsGql;
   errorMessage = err.errorMessageGql;
  return callback({"errors":errors,"errorMessage":errorMessage},'' );
}
if(!result)
{

  console.log('values blank ** end****');
  console.log('No errors and results from GQL');

  return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
}
else
{
  console.log('values result.data.signInUsername');
  console.log(result.data.signInUsername);

return callback('',result.data.signInUsername);
}
}




export async function handleSignInJWT(values:any,callback:any) {
  let result:any='',errorMessage='',errors =new Array();
  console.log(values)
 try
 {
   result= await execGql('mutation',SignInUsernameJWT,values)
  }
 catch(err:any)
 {  
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
   return callback({"errors":errors,"errorMessage":errorMessage},'' );
 }
 if(!result)
 {
   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
 return callback('',result.data.signInUsernameJWT);
 }
 }

 export async function handleMobileSignInJWT(values:any,callback:any) {
  let result:any='',errorMessage='',errors =new Array();
  console.log(values)
 try
 {
   result= await execGql('mutation',signInMobileJWT,values)
   if(!result)
 {
   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
 return callback('',result.data.signInMobileJWT);
 }
  }
 catch(err:any)
 {  
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
   return callback({"errors":errors,"errorMessage":errorMessage},'' );
 }
 
 }






export async function handleSignUpJWT(values:any,callback:any) 
 {
  let result:any='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',SignUpUsernameJWT,values)
     console.log('resultJWT');
     console.log(result);
     console.log('resultJWT--end');
  }
  catch(err:any)
   {  
    console.log('errJWT');
    console.log(err);
    console.log('errJWT--end');
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.signUpUsernameJWT);
 }
 }


 export async function handleMobileSignUpJWT(values:any,callback:any) 
 {
  let result:any='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',signUpMobileJWT,values)
     console.log('resultJWT');
     console.log(result);
     console.log('resultJWT--end');
  }
  catch(err:any)
   {  
    console.log('errJWT');
    console.log(err);
    console.log('errJWT--end');
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.signUpMobileJWT);
 }
 }

 export async function handleVerifyMobileOTPJWT(values:any,callback:any) 
 {
  let result:any='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',verifyMobileOTPJWT,values)
     if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.verifyMobileOTPJWT);
 }
  }
  catch(err:any)
   {  
    console.log('errJWT');
    console.log(err);
    console.log('errJWT--end');
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 
 }




 
 export async function handleSignUp(values:any,callback:any) 
 {
  let result:any='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',SignUpUsername,values)
   
  }
  catch(err)
   {  
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.signUpUsername);
 }
 }






export async function  checkCurrentUsername(callback:any) {
  let result:any='',errorMessage='',errors=[];
  try
  {
      result= await execGql('query',CurrentUser,{})
  }
  catch(err:any)
   {  
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;   
       return callback({errors,errorMessage});
    }
   if(!result.data.currentUsername)
      {
            callback();
      }
      else
      {
           callback('',result.data.currentUsername);
       }   
} 




export async function  checkCurrentUsernameJWT(callback:any) {
  let result:any='',errorMessage='',errors=[];
  try
  {
      result= await execGql('query',CurrentUserJWT,{})
      if(!result.data.currentUsernameJWT)
      {
            callback();
      }
      else
      {
           callback('',result.data.currentUsernameJWT);
       }   
      console.log('gql result');
      console.log(result);
  }
  catch(err:any)
   {  
    console.log('gql err');
    console.log(err);
    errors = err.errorsGql;
      errorMessage = err.errorMessageGql;   
       return callback({errors,errorMessage});
    }
   
} 




export async function  handleSignoutUsername(callback:any) {


  let result:any='',errorMessage='',errors=[];
  try
  {
  
    result= await execGql('mutation',SignOutUsername,{})
  
  }
  catch(err)
   {  
       errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
     return callback({"errors":errors,"errorMessage":errorMessage} );
  } 

  if(!result.data.signOutUsername)
  {
   
    callback();
  }
  else
  {
    
    callback('',result.data.signOutUsername);
   } 
  

} 


export async function  handleSignoutUsernameJWT(callback:any) {

console.log('sessionStorage remove');
 // sessionStorage.removeItem('jwtToken');
  console.log('sessionStorage remove ends');


  var result='',errorMessage='',errors=[];

    sessionStorage.removeItem('jwtToken');
    callback();

}