import React, { useState, useCallback,useEffect} from 'react'
import { M_LeftIconRoundInput } from '../../common/InputFields/RoundInput'
import {M_SocialMediaLogin} from './SocialMediaLogin'
import {connect} from 'react-redux'
import {ActionToDispatch,ActionToRedirect,handleSignInJWT, checkCurrentUsernameJWT} from '../Redux/reducers/actions'
import {displaySubmitError, runCheck,requiredCheck,maxLength128,minLength2} from '../../common/validationlib';
import {checkTouched,nvl,checkItem,isCheckedbool,getDocumenForSave} from '../../common/CommonLogic';
import ReCAPTCHA from "react-google-recaptcha";
import {getCaptchaSitekey,urlBase64ToUint8Array,notificationSubscribeUrl} from '../../shared/baseUrl'
import Loader from '../../common/Loader/Loader'
const initobj = {
  applicationid : "15001500", client: "45004500" ,  lang: "EN",
  username: '',
  password: '',
  validatemode:'touch'
}


export const handleSaveCheck=(currentdocument:any)=>{
const {touched,username,password,validatemode} = currentdocument ; 
currentdocument.formValid=true
   let isNew=false;
   let username_check=runCheck(nvl(username,''), [requiredCheck]);
   let password_check=runCheck(nvl(password,''), [requiredCheck]);
   if(validatemode=='save'  )
   {  currentdocument.errorsAll={
       password:password_check,
        username:username_check,
    }
   }
   if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        username:checkTouched(nvl(touched.username,false),username_check),
        password:checkTouched(nvl(touched.password,false),password_check) 
      }
   }
   if(username_check.length===0 && password_check.length===0){
    currentdocument.formValid=false
   }
  return currentdocument;
}


const displayConfirmNotification = () =>{



if('serviceWorker' in navigator){

  let options={
    body:'Successfully Subscribed to RecoKart !',
    dir:'ltr',
    lang:'en-US',
    vibrate:[100,50,200],
    }
  navigator.serviceWorker.ready
  .then((swreg:any)=>{

    swreg.showNotification('Successfully subscribed',options);
  })
   
}


}
const askForNotificationPermission =()=>{
  console.log('Asking Permission')
  Notification.requestPermission((result)=>{
 
    console.log('User Choice',result);
    if(result!=='granted')
    {
      console.log('No notification permission granted!',result);
    }else{

     
      displayConfirmNotification();
      console.log('****');
    }
  })

}


var registration;

const askForPushNotificationPermission =()=>{
  console.log('Asking Permission')
  Notification.requestPermission((result)=>{
 
    console.log('User Choice',result);
    if(result!=='granted')
    {
      console.log('No notification permission granted!',result);
    }else{

     
      configurePushSub();
      console.log('****');
    }
  })

}









const configurePushSub =()=>{
  if(!('serviceWorker' in navigator)){
    return;
  }
 navigator.serviceWorker.ready
 .then((swreg)=>{
  registration=swreg;
  console.log(registration)
    return swreg.pushManager.getSubscription();
 }) 
.then((sub)=>{
console.log('sub',sub)
  if(sub===null){

//Create a new subscription



    var vapidPublicKey='BL5xjOc6cleIjeFvF3FeUiVISgnPhNS45ApAjvWuyjat6696pZZeUOYlMKkJGueShOIfV0tQ3WSBoGnEtiWGbkY';
    var vapidPrivateKey='2tWOurQiP_QO8aQiZAwwm7Bejh0brOi74oIrVxt9-4k'
    var convertedVapidPublicKey= urlBase64ToUint8Array(vapidPublicKey)
   return registration.pushManager.subscribe({
     userVisibleOnly:true,
     applicationServerKey:convertedVapidPublicKey
   })
 


  }else{
    // We have a subscription
    console.log('**************already registered****************')

  }

})
.then((newSub)=>{
  

  return fetch(notificationSubscribeUrl,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body:JSON.stringify(newSub)
  })
  .then((res)=>{
    if(res.ok)
    {
      //displayConfirmNotification();

    }
  })
  .catch((err)=>{
    console.log(err);
  })
 

})
}



const pushNotificationButton = () =>
{
  if('Notification' in window  && 'serviceWorker' in navigator ) {

    return( <div className='switch-login-container_itss'onClick={()=>askForPushNotificationPermission()} >Enable Push Notification -New</div>)
    
  }
  else
  {
    return( <div></div>)
  }
}



const notificationButton = () =>
{
  if('Notification' in window ) {

    return( <div className='switch-login-container_itss'onClick={()=>askForNotificationPermission()} >Display Notification </div>)
    
  }
  else
  {
    return( <div></div>)
  }
}





export function SignInForm(props:any) {
  const [user, setUser] = useState(initobj)
  const [loaderDisplay, setloaderDisplay] = useState(false) 
  const [captcha ,setCaptcha] = useState(false)
  const [state, setState] = useState(({}))
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

       
         handleSignInJWT(values,async(err:any,result:any)=>{
      
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
              setState({formErrorMessage: err.errorMessage,formErrors : err.errors}); 
              setloaderDisplay(false)
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
       let { username, password, applicationid ,client,lang}=currentdocument
       let values={
        username, password, applicationid ,client,lang 
       }
       try{ handleProcessSubmitSignIn(values);   }
       catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
      
    } 

    const onCaptchaChange = (value:any) => {
      setCaptcha(value);
 
    }

    const promptTest = () =>{


      let {defferedPrompt} =window;
      

     
     if(defferedPrompt){

  
      defferedPrompt.prompt();

      defferedPrompt.userChoice.then((choiceResult)=>{
    
          if(choiceResult.outcome==='dismissed'){
            console.log('User Cancelled installation')
          }else{
            console.log('User added to home screen')
          }

        });
        defferedPrompt=null;
    
      }
    }

    handleSaveCheck(user)
   return (
    <div className="form sign-in-form">
      <Loader display={loaderDisplay}/>
      <h4 className="title">Sign In</h4>
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="username" placeholder="Username" currdoc={user} section={"username"} label="user name" wd={"12"}/>
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-lock" name="password" placeholder="Password" currdoc={user} section={"password"} label="user name" wd={"12"} type="password"/>
     
      <ReCAPTCHA sitekey={getCaptchaSitekey()}  onChange={()=>{onCaptchaChange(true)}}   />
      <input type="button" value="Login" className="btn solid" onClick={()=>{handleSubmit(user)}}  disabled = {captcha ? "" : "disabled"} />
      <div  className="field-error_itss">{state.formErrorMessage}</div>
      <M_SocialMediaLogin label="Login" />
      <div className='switch-login-container_itss'onClick={()=>setForm()} >New User ?</div>
      <div className='switch-login-container_itss'onClick={()=>promptTest()} > App ICON ON FRONT SCREEN </div>
      {notificationButton()}
      {pushNotificationButton()}

    </div>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess,authuser:state.auth.authuser };
 };
export const M_SignInForm = React.memo(connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(SignInForm))