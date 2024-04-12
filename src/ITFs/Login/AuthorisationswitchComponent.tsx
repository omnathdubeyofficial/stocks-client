import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useLocation
  } from "react-router-dom";
  import { ActionToRedirect,ActionToDispatch,checkCurrentUsernameJWT} from '../Redux/reducers/actions'

  import DashboardComponent from '../Dashboard/Dashboard'
  import HomeComponent from './Login'
 

  import { connect } from 'react-redux';
  

  interface IProps{
    ActionToDispatch:any;
    ActionToRedirect:any;
    authenticated:boolean
  }
  class AuthorisationswitchComponent1 extends React.Component<IProps>{


    constructor(props:any) {

        super(props);
         this.state = {
        loader:false
                     };
      }



    
async componentDidMount(){
  checkCurrentUsernameJWT(async (err:any,result:any)=>
                 {
                  if(!err)
                   {
                  
                             if(!result)
                             {
                               this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err });
                               //setState({formErrorMessage: errorMessage,formErrors : errors}); 
                               this.setState({loader:false})
                             }
                             else
                             {
                             //setState({formErrorMessage: 'Authenticated'});  
                             this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                             this.props.ActionToRedirect('/dashboard');
                             this.setState({loader:false})
                             }
 
                   }
                 }
                 )
}


      render()
      {

        
          const {authenticated} = this.props
         
          if(authenticated)
          {
     
            return    (
                <Router>
                <DashboardComponent/>
               
                </Router>
              )

          }
          else
          {
            return    (
                <Router>
        
            
           
                 <HomeComponent/>
                
                {/* <Switch>
             <Route key={100} path={"/"} exact={true} children={<HomeComponent/>}/>
            
                </Switch> */}
                </Router>
              )
          }
          
          
      }
    
    
    }

    const mapStateToProps = (state:any) => { 
    
        return { authenticated:state.auth.authenticated,
                 authuser:state.auth.authuser ,
                 
                };
       };
        



       


    let AuthorisationswitchComponent = connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(AuthorisationswitchComponent1);


    export {AuthorisationswitchComponent}