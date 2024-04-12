import React, { useState, useCallback,useEffect} from 'react'
import { M_LeftIconRoundInput } from '../../common/InputFields/RoundInput'
import {M_SocialMediaLogin} from './SocialMediaLogin'
import {connect} from 'react-redux'
import {ActionToDispatch,ActionToRedirect,handleSignInJWT, checkCurrentUsernameJWT,handleMobileSignInJWT,handleVerifyMobileOTPJWT} from '../Redux/reducers/actions'
import {displaySubmitError, runCheck,requiredCheck,maxLength128,minLength2,minLength6,maxLength6} from '../../common/validationlib';
import {checkTouched,nvl,checkItem,isCheckedbool,getDocumenForSave} from '../../common/CommonLogic';
import ReCAPTCHA from "react-google-recaptcha";
import Loader from '../../common/Loader/Loader'
const initobj = {
  applicationid : "15001500", client: "45004500" ,  lang: "EN",
  mobile: '',
  otp: '',
  validatemode:'touch'
}


export const handleSaveCheck=(currentdocument:any)=>{
const {touched,mobile,otp,validatemode} = currentdocument ; 
currentdocument.formValid=true
   let isNew=false;
   let mobile_check=runCheck(nvl(mobile,''), [requiredCheck]);
   //let otp_check=runCheck(nvl(otp,''), [requiredCheck,minLength6,maxLength6]);
   if(validatemode=='save'  )
   {  currentdocument.errorsAll={
       //otp:otp_check,
        mobile:mobile_check,
    }
   }
   if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        mobile:checkTouched(nvl(touched.mobile,false),mobile_check),
        //otp:checkTouched(nvl(touched.otp,false),otp_check) 
      }
   }
   if(mobile_check.length===0 //&& otp_check.length===0
    ){
    currentdocument.formValid=false
   }
  return currentdocument;
}

export const handleOTPSaveCheck=(currentdocument:any)=>{
  const {touched,mobile,otp,validatemode} = currentdocument ; 
  currentdocument.formValid=true
     let isNew=false;
     let mobile_check=runCheck(nvl(mobile,''), [requiredCheck]);
     let otp_check=runCheck(nvl(otp,''), [requiredCheck,minLength6,maxLength6]);
     if(validatemode=='save'  )
     {  currentdocument.errorsAll={
         otp:otp_check,
          mobile:mobile_check,
      }
     }
     if(validatemode=='touch' && touched!=null)
     {
          currentdocument.errorsAll={
          mobile:checkTouched(nvl(touched.mobile,false),mobile_check),
          otp:checkTouched(nvl(touched.otp,false),otp_check) 
        }
     }
     if(mobile_check.length===0 && otp_check.length===0){
      currentdocument.formValid=false
     }
    return currentdocument;
  }
export function OTPSignInForm(props:any) {
  const [user, setUser] = useState(initobj)
  const [loaderDisplay, setloaderDisplay] = useState(false) 
  const [captcha ,setCaptcha] = useState(false)
  const [state, setState] = useState(({}))
  const [otpDisplay, setotpDisplay] = useState(false)
  const {setForm} = props
  function updateUser(doc:any) {
    handleClearErrors();
    setUser(doc)
    //console.log(newuser)
  }
 
  // useEffect(() => {
  //   updateUser(handleSaveCheck(user))
    
  //   return () => {
      
  //   }
  // }, [user])
  
    const M_updateUser = useCallback((e)=>updateUser(e), [user])
    const handleClearErrors=()=>{
      setState({formErrorMessage: '',formErrors: []});
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

        async function handleOTPProcessSubmitSignIn(values:any) {
          var result='',errorMessage='',errors =new Array();
          props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
          setloaderDisplay(true)
          setState({formErrorMessage: ''});
 
        
          handleVerifyMobileOTPJWT(values,async(err:any,result:any)=>{
       
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
 
                 console.log('result.signUpmobileJWT.token');
           console.log(result.token);
           console.log('result.signUpmobileJWT.token--end');
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
                             props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                             props.ActionToRedirect('/dashboard');
                             setloaderDisplay(false)
                             }
 
                   }
                 }
                 )
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
   
    const handleSubmit=(currentdocument:any)=>{
       handleClearErrors();
       currentdocument.validatemode = 'save'
       handleSaveCheck(currentdocument)
       if(currentdocument.formValid){
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

    const handleOTPSubmit=(currentdocument:any)=>{
      handleClearErrors();
      currentdocument.validatemode = 'save'
      handleOTPSaveCheck(currentdocument)
      if(currentdocument.formValid){
       setUser({...currentdocument})
       return
     }
      let { mobile, otp, applicationid ,client,lang}=currentdocument
      let values={
        username:mobile, mobile, mobileotp:otp, applicationid ,client,lang 
      }
      try{ handleOTPProcessSubmitSignIn(values);   }
      catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
     
   }

    const onCaptchaChange = (value:any) => {
      setCaptcha(value);
 
    }


    handleSaveCheck(user)
   return (
    <div className="form sign-in-form">
      <Loader display={loaderDisplay}/>
      <h4 className="title">OTP based Sign In</h4>
      {!otpDisplay ? <><M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="mobile" placeholder="Mobile No." currdoc={user} section={"mobile"} label="user name" wd={"12"} />     
      <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={()=>{onCaptchaChange(true)}}   />
      <input type="button" value="Login" className="btn solid" onClick={()=>{handleSubmit(user)}}  disabled = {captcha ? "" : "disabled"} />
      </>:<>
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="mobile" placeholder="Mobile No." currdoc={user} section={"mobile"} label="user name" wd={"12"} />
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-lock" name="otp" placeholder="Enter OTP" currdoc={user} section={"otp"} label="" wd={"12"} type="password" />
           <div className="row_itss">
             <div style={{ display: 'flex', width: "130px", color: "var(--main_itss-color)", cursor: "pointer" }} onClick={() => { handleSubmit(user) }}>
               <span style={{ flex: "10" }}>Resend OTP</span>
               <span className="las la-sync" style={{ flex: 2, height: "100%", fontSize: "1rem", padding: "5px 0 0 0" }} />
             </div>
           </div>
      <input type="button" value="Submit" className="btn solid" onClick={()=>{handleOTPSubmit(user)}}   />

      </>}
      <div  className="field-error_itss">{state.formErrorMessage}</div>
      <M_SocialMediaLogin label="Login" />
      <div className='switch-login-container_itss'onClick={()=>setForm()} >New User ?</div>
    </div>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess,authuser:state.auth.authuser };
 };
export const M_OTPSignInForm = React.memo(connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(OTPSignInForm))