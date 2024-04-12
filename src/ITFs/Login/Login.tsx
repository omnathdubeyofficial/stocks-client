import React, { useState } from 'react'
import './login.css'
import register from './img/register.svg'
import log from './img/log.svg'
import { M_SignInForm } from './SignInForm'
import { M_SignUpForm } from './SignUpForm'
import { M_OTPSignUpForm } from './OTPSignUpForm'
import {M_OTPSignInForm} from './OTPSignInForm'
import {connect} from 'react-redux' 
import Dashboard from '../Dashboard/Dashboard'
import { ActionToDispatch } from '../Redux/reducers/actions/index'
import {setCurrentCompany} from '../Redux/ActionCreators'
const logintype = ""   //should be OTP or Blank
function Login(props: any) {
  const [form, setForm] = useState('signin')
  function setSignupForm() {
    setForm('signup')
    console.log(form)
  }
  function setSigninForm() {
    setForm('signin')
    console.log(form)
  }
// if(sessionStorage.getItem('jwtToken') !== undefined || sessionStorage.getItem('jwtToken') !== null ){
// props.checkuserLogggedIn()
// }

const {companies,setCurrentCompany,currentcmpn,authenticated}= props;
          let selectedcmpn='';
          if(currentcmpn=='' && companies.length>0)
          {
          if(companies.length==1)
          {
            selectedcmpn=companies[0].cmpn;
          }
          else
          {
            companies.map((cmpn:any,index:any)=>{  
              if(cmpn.isdefault=='Y')
                  {  
                    selectedcmpn=cmpn.cmpn
                   }
               }
          
            )
          }
  
          if(selectedcmpn=='' && companies.length>0 )
          {
              selectedcmpn=companies[0].cmpn;
          }
  
          setCurrentCompany(selectedcmpn);
      }
      

if(authenticated){
  return (<Dashboard/>)
}else
  return (<>
    <div className={form === 'signin' ? 'login-container_itss' : 'login-container_itss sign-up-mode'}>
      <div className="form-container_itss">
        <div className="signin-signup">
        {logintype ==="otp" ? <M_OTPSignInForm />:<M_SignInForm />}
          {logintype ==="otp" ? <M_OTPSignUpForm />:<M_SignUpForm/>}
          
        </div>
      </div>
      <div className="panels-container_itss">
        <div className="panel panel-left">
          <div className="content">
            <h3>New Here?</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              voluptate blanditiis sit.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={setSignupForm}
            >
              Sign Up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>

        <div className="panel panel-right">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              voluptate blanditiis sit.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={setSigninForm}
            >
              Sign In
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
    
    <div className='login-container_itss-mobile'>
    {form ==='signin'?logintype ==="otp"? <M_OTPSignInForm setForm={setSignupForm}/>:<M_SignInForm setForm={setSignupForm}/>
      :logintype ==="otp" ? <M_OTPSignUpForm setForm={setSigninForm}/>:<M_SignUpForm setForm={setSignupForm}/>
      
    }
    </div>
    </>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,
              authuser:state.auth.authuser ,
              companies:state.documents.companies,
              currentcmpn:state.documents.currentcmpn,
             };
    };
 const mapDispatchToProps = (dispatch:any) =>({
     ActionToDispatch,
     setCurrentCompany: (currentcmpn:any,callback:any) =>{
       dispatch(setCurrentCompany(currentcmpn));
       if(callback && typeof callback === "function"){
                   callback();
               }
     }});
export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Login))