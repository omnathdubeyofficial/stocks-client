import React, { useState,useCallback,useEffect,useMemo } from 'react'
import { M_LeftIconRoundInput } from '../../common/InputFields/RoundInput'
import {M_SocialMediaLogin} from './SocialMediaLogin'
import {ActionToDispatch,ActionToRedirect,handleMobileSignUpJWT,checkCurrentUsernameJWT,handleVerifyMobileOTPJWT,handleMobileSignInJWT} from '../Redux/reducers/actions'
import {checkTouched,nvl} from '../../common/CommonLogic';
import {displaySubmitError,displayFieldError,runCheck,minLength10,
  maxLength10,emailCheck,numberCheck,requiredCheck,maxLength128,minLength2,minLength6,maxLength6} from '../../common/validationlib';
import {connect} from 'react-redux' 
import ReCAPTCHA from "react-google-recaptcha";
import Loader from '../../common/Loader/Loader'
const initobj = {
  applicationid : "15001500", client: "45004500" ,  lang: "EN",
  username: '',
  email: '',
  mobile:'',
  validatemode:'touch'
}
export function OTPSignUpForm(props:any) {
  const [user, setUser] = useState(initobj)
  const [state, setState] = useState(({}))
  const [captcha ,setCaptcha] = useState(false)
  const [loaderDisplay, setloaderDisplay] = useState(false)
  const [otpDisplay, setotpDisplay] = useState(false)
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
   handleMobileSignUpJWT(values,async (err:any,result:any)=>{
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
      console.log("result====>",result)
      setloaderDisplay(false)
      setotpDisplay(true)
      setState({formErrorMessage: 'OTP has been sent on entered mobile numner'});

      //  sessionStorage.setItem('jwtToken', result.token);
      //  console.log('token added');

      //  checkCurrentUsernameJWT(async (err:any,result:any)=>
      //  {
      //   if(!err)
      //    {
      //             if(!result)
      //              {
      //                props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
      //                setState({formErrorMessage: errorMessage,formErrors : errors}); 
      //                setloaderDisplay(false)
      //              }
      //              else
      //              {
      //              setState({formErrorMessage: 'Authenticated'});
      //              setloaderDisplay(false)  
      //              props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
      //              props.ActionToRedirect('/dashboard');
      //              }
      //    }
      //  })
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
  
const handleOTPProcessSubmit = async(values:any) => {
  var result='',errorMessage='',errors =new Array();
  props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
  setState({formErrorMessage: ''});
  setloaderDisplay(true)
  handleVerifyMobileOTPJWT(values,async (err:any,result:any)=>{
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
     console.log("result====>",result)

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
 let { mobile, lastname,email,username,  applicationid ,client,lang}=currentdocument
 let values={
   mobile, lastname,email,username:mobile,  applicationid ,client,lang 
 }
  try{  handleProcessSubmit(values)   }
  catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
 
} 

const handleOTPSubmit=(currentdocument:any)=>{
  handleClearErrors();
  currentdocument.validatemode = 'save'
  handleOTPSaveCheck(currentdocument)
  if(!currentdocument.formValid){
   setUser({...currentdocument})
   return
 }
 let { mobile,email,username,  applicationid ,client,lang,otp}=currentdocument
 let values={
   mobile,email,username:mobile,  applicationid ,client,lang,mobileotp:otp 
 }
  try{  handleOTPProcessSubmit(values)   }
  catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
 
}

handleSaveCheck(user)
const onCaptchaChange = (value:any) => {
  setCaptcha(value);

}
async function handleProcessSubmitSignIn(values:any) {
  var result='',errorMessage='',errors =new Array();
  props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
  setloaderDisplay(true)
  setState({formErrorMessage: ''});


  handleMobileSignInJWT(values,async(err:any,result:any)=>{

     if(!err)
     {
  
       if(!result)
       {
         props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
         setloaderDisplay(false)
         setState({formErrorMessage: errorMessage,formErrors : errors});
           
       }
       else
       {
         console.log("result====>",result)
setloaderDisplay(false)
setotpDisplay(true)
setState({formErrorMessage: 'Enter OTP sent on regitered mobile numner'});
   //       console.log('result.signUpmobileJWT.token');
   // console.log(result.token);
   // console.log('result.signUpmobileJWT.token--end');
   // sessionStorage.setItem('jwtToken', result.token);
   // console.log('token added');
       
   // checkCurrentUsernameJWT(async (err:any,result:any)=>
   //       {
   //        if(!err)
   //         {
          
   //                   if(!result)
   //                   {
   //                     props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
   //                     setState({formErrorMessage: errorMessage,formErrors : errors}); 
   //                     setloaderDisplay(false)
   //                   }
   //                   else
   //                   {
   //                   setState({formErrorMessage: 'Authenticated'});  
   //                   props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
   //                   props.ActionToRedirect('/dashboard');
   //                   setloaderDisplay(false)
   //                   }

   //         }
   //       }
   //      )
       }
    }
     else
     {
       props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err.errors });
       setloaderDisplay(false)
       setState({formErrorMessage: err.errorMessage,formErrors : err.errors}); 
     }
  })
 }
const ResendOTP=(currentdocument:any)=>{
  handleClearErrors();
  currentdocument.validatemode = 'save'
  handleSaveCheck(currentdocument)
  if(!currentdocument.formValid){
   setUser({...currentdocument})
   return
 }
  let { mobile,  applicationid ,client,lang}=currentdocument
  let values={
   username:mobile, mobile, applicationid ,client,lang 
  }
  try{ handleProcessSubmitSignIn(values);   }
  catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
 
} 

  return (
    <div className="form sign-up-form">
      <Loader display={loaderDisplay}/>
      <h2 className="title">OTP based Sign Up{props.key1}</h2>
     {!otpDisplay ? <> <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="username" placeholder="Username" currdoc={user} section={"username"} label="user name" wd={"12"}/>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-phone" name="mobile"  placeholder="Mobile No" currdoc={user} section={"mobile"} label="mobile" wd={"12"}/>
     <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-envelope" name="email" placeholder="Email" currdoc={user} section={"email"} label="mobile" wd={"12"}/>
     <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={()=>{onCaptchaChange(true)}}   />
     
      <input type="button" value="Register" className="btn solid" onClick={()=>{handleSubmit(user)} }  disabled = {captcha ? "" : "disabled"}/></>:
      <><M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-lock" name="otp" placeholder="OTP" currdoc={user} section={"otp"} label="mobile" wd={"12"} type="password"/> 
      <div className="row_itss">
             <div style={{ display: 'flex', width: "130px", color: "var(--main_itss-color)", cursor: "pointer" }} onClick={() => { ResendOTP(user) }}>
               <span style={{ flex: "10" }}>Resend OTP</span>
               <span className="las la-sync" style={{ flex: 2, height: "100%", fontSize: "1rem", padding: "5px 0 0 0" }} />
             </div>
           </div>
      <input type="button" value="Submit" className="btn solid" onClick={()=>{handleOTPSubmit(user)} } />
      </>
      }
      <div  className="field-error_itss">{state.formErrorMessage}</div>
       <M_SocialMediaLogin label="Sign up" />
       <div className='switch-login-container_itss' onClick={()=>setForm()}>Already a member?</div> 
    </div>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess, authuser:state.auth.authuser };
 };
export const M_OTPSignUpForm = React.memo(connect(mapStateToProps,{ActionToDispatch,ActionToRedirect})(OTPSignUpForm))


export const handleSaveCheck=(currentdocument:any)=>
{
  const {touched,username,mobile,email,validatemode} = currentdocument ; 
  currentdocument.formValid=true
   let isNew=false;
   let username_check=runCheck(nvl(username,''), [requiredCheck]);
   let mobile_check=runCheck(nvl(mobile,''), [requiredCheck,numberCheck]);
   let email_check=runCheck(nvl(email,''), [requiredCheck,emailCheck]);


   if(validatemode=='save')
   {
        currentdocument.errorsAll={
        mobile:mobile_check,
        username:username_check,
        email:email_check
      }
   }

  if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        mobile:checkTouched(nvl(touched.mobile,false),mobile_check),
        username:checkTouched(nvl(touched.username,false),username_check),
        email:checkTouched(nvl(touched.email,false),email_check) 
      }
   }
   console.log(username_check.length===0  && mobile_check.length === 0 && email_check.length === 0)
   if(username_check.length !== 0  || mobile_check.length !== 0 || email_check.length !== 0){
    currentdocument.formValid=false
   }
  return currentdocument;
}


export const handleOTPSaveCheck=(currentdocument:any)=>
{
  const {touched,username,mobile,email,validatemode,otp} = currentdocument ; 
  currentdocument.formValid=true
   let isNew=false;
   let username_check=runCheck(nvl(username,''), [requiredCheck]);
   let mobile_check=runCheck(nvl(mobile,''), [requiredCheck,numberCheck]);
   let email_check=runCheck(nvl(email,''), [requiredCheck,emailCheck]);
   let otp_check=runCheck(nvl(otp,''), [requiredCheck,numberCheck,minLength6,maxLength6]);

   if(validatemode=='save')
   {
        currentdocument.errorsAll={
        mobile:mobile_check,
        username:username_check,
        email:email_check,
        otp:otp_check
      }
   }

  if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        mobile:checkTouched(nvl(touched.mobile,false),mobile_check),
        username:checkTouched(nvl(touched.username,false),username_check),
        email:checkTouched(nvl(touched.email,false),email_check),
        otp:checkTouched(nvl(touched.otp,false),otp_check) 
      }
   }
   console.log(username_check.length===0 && otp_check.length===0 &&  mobile_check.length === 0 && email_check.length === 0)
   if(username_check.length !== 0 || mobile_check.length !== 0 || email_check.length !== 0){
    currentdocument.formValid=false
   }
  return currentdocument;
}