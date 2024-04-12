import React, { useState,useCallback,useEffect,useMemo } from 'react'
import { M_LeftIconRoundInput } from '../../common/InputFields/RoundInput'
import {M_SocialMediaLogin} from './SocialMediaLogin'
import {ActionToDispatch,ActionToRedirect,handleSignUpJWT,checkCurrentUsernameJWT} from '../Redux/reducers/actions'
import {checkTouched,nvl} from '../../common/CommonLogic';
import {displaySubmitError,displayFieldError,runCheck,minLength10,
  maxLength10,emailCheck,numberCheck,requiredCheck,maxLength128,minLength2} from '../../common/validationlib';
import {connect} from 'react-redux' 
import ReCAPTCHA from "react-google-recaptcha";
import {getCaptchaSitekey} from '../../shared/baseUrl'
import Loader from '../../common/Loader/Loader'


const initobj = {
  applicationid : "15001500", client: "45004500" ,  lang: "EN",
  username: '',
  password: '',
  email: '',
  mobile:'',
  validatemode:'touch'
}
export function SignUpForm(props:any) {
  const [user, setUser] = useState(initobj)
  const [state, setState] = useState(({}))
  const [captcha ,setCaptcha] = useState(false)
  const [loaderDisplay, setloaderDisplay] = useState(false)
  const {setForm} = props 
  // useEffect(() => {
  //   handleClearErrors();
  //   updateUser(handleSaveCheck(user))
    
  //   return () => {
      
  //   }
  // }, [user])
  const updateUser=(doc: any)=> {
    setUser(doc)
  }


  const M_updateUser = useCallback((e)=>updateUser(e), [user])


 
  const handleClearErrors=()=>
  {
    setState({formErrorMessage: '',formErrors: []});
  }

  
   const handleProcessSubmit = async(values:any) => {
   var result='',errorMessage='',errors =new Array();
   props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
   setState({formErrorMessage: ''});
   setloaderDisplay(true)
   handleSignUpJWT(values,async (err:any,result:any)=>
 {
   if(!err)
   {
     if(!result)
     {
       props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
       setState({formErrorMessage: errorMessage,formErrors : errors}); 
       setloaderDisplay(false)
     }
     else
     {
       
       console.log('result.signUpUsernameJWT.token');
       console.log(result.token);
       console.log('result.signUpUsernameJWT.token--end');
       sessionStorage.setItem('jwtToken', result.token);
       console.log('token added');
       checkCurrentUsernameJWT(async (err:any,result:any)=>
       {
        if(!err)
         {
                  if(!result)
                   {
                     props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
                     setState({formErrorMessage: errorMessage,formErrors : errors}); 
                     setloaderDisplay(false)
                   }
                   else
                   {
                   setState({formErrorMessage: 'Authenticated'});
                   setloaderDisplay(false)  
                   props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                   props.ActionToRedirect('/dashboard');
                   }
         }
       })
    }
   }
   else
   {
     props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err.errors });
     setState({formErrorMessage: err.errorMessage,formErrors : err.errors});  
     setloaderDisplay(false)
    }
    }

 )
}
  




const handleSubmit=(currentdocument:any)=>{
  handleClearErrors();
  currentdocument.validatemode = 'save'
  handleSaveCheck(currentdocument)
  if(!currentdocument.formValid){
   setUser({...currentdocument})
   return
 }
 let { mobile, lastname,email,username, password, applicationid ,client,lang}=currentdocument
 let values={
   mobile, lastname,email,username, password, applicationid ,client,lang 
 }
  try{  handleProcessSubmit(values)   }
  catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
 
} 
handleSaveCheck(user)
const onCaptchaChange = (value:any) => {
  setCaptcha(value);

}



  return (
    <div className="form sign-up-form">
      <Loader display={loaderDisplay}/>
      <h2 className="title">Sign Up:{props.key1}</h2>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="username" placeholder="Username" currdoc={user} section={"username"} label="user name" wd={"12"}/>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-phone" name="mobile"  placeholder="Mobile No" currdoc={user} section={"mobile"} label="mobile" wd={"12"}/>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-envelope" name="email" placeholder="Email" currdoc={user} section={"email"} label="mobile" wd={"12"}/>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-lock" name="password" placeholder="Password" currdoc={user} section={"password"} label="mobile" wd={"12"} type="password"/> 
     <ReCAPTCHA sitekey={getCaptchaSitekey()} onChange={()=>{onCaptchaChange(true)}}   />
     
      <input type="button" value="Register" className="btn solid" onClick={()=>{handleSubmit(user)} }  disabled = {captcha ? "" : "disabled"}/>
      <div  className="field-error_itss">{state.formErrorMessage}</div>
       <M_SocialMediaLogin label="Sign up" />
       <div className='switch-login-container_itss' onClick={()=>setForm()}>Already a member?</div> 
    </div>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess, authuser:state.auth.authuser };
 };
export const M_SignUpForm = React.memo(connect(mapStateToProps,{ActionToDispatch,ActionToRedirect})(SignUpForm))


export const handleSaveCheck=(currentdocument:any)=>
{
  const {touched,username,mobile,password,email,validatemode} = currentdocument ; 
  currentdocument.formValid=true
   let isNew=false;
   let username_check=runCheck(nvl(username,''), [requiredCheck]);
   let mobile_check=runCheck(nvl(mobile,''), [requiredCheck,numberCheck]);
   let password_check=runCheck(nvl(password,''), [requiredCheck]);
   let email_check=runCheck(nvl(email,''), [requiredCheck,emailCheck]);


   if(validatemode=='save')
   {
        currentdocument.errorsAll={
        mobile:mobile_check,
        password:password_check,
        username:username_check,
        email:email_check
      }
   }

  if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        mobile:checkTouched(nvl(touched.mobile,false),mobile_check),
        username:checkTouched(nvl(touched.username,false),username_check),
        password:checkTouched(nvl(touched.password,false),password_check) ,
        email:checkTouched(nvl(touched.email,false),email_check) 
      }
   }
   console.log(username_check.length===0 && password_check.length===0 && mobile_check.length === 0 && email_check.length === 0)
   if(username_check.length !== 0 || password_check.length !== 0 || mobile_check.length !== 0 || email_check.length !== 0){
    currentdocument.formValid=false
   }
  return currentdocument;
}