import { useState } from 'react'

import Customers from '../Customers/Customers'
import Projects from '../Projects/Projects'
import Header from './Header/Header'
import IndicatorCards from './Indicators/IndicatorCards'
import {SideBar} from '../../../SideBar'

import {connect} from 'react-redux'
import UserComponent from '../../User/UserComponent'
import Stocksnews from '../../ITFs/News/Stocksnews'
import UserListComponent from '../../User/UserListComponent'
import RecommendationList from '../recommendation/RecommendationList'
import RecommendationComponent from '../recommendation/RecommendationComponent'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
import { SearchSelectInput } from '../../common/InputFields/SearchSelectInput'
import Stepperimp from '../../common/Stepper/stepperimp'
import Stocksnewslist from '../../ITFs/News/Stocksnewslist'
import Individualnews from '../../ITFs/News/individualnews'
import Companystatus from '../News/companystatus'
import Companystatuslist from '../News/companystatuslist'


const DashboardComponent = (props: any) => {
const [loaderDisplay,setloaderDisplay] =useState(true)
  
  return (
    <>
      <IndicatorCards />
      <div className="recent-grid">
        <Projects />
        <Customers />
        <SearchSelectInput wd="3" label="Weightage" name="weightage" currdoc={{}} section={'weightage'} modifydoc={()=>{}}/>
      </div>
    </>
  )
}

function Dashboard(props: any) {
  
  console.log('in dashboard')
  const [displayComponent, setDisplayComponent] = useState('Dashboard')
  return (
    <Rounter>
      <SideBar selectcomponent={setDisplayComponent} />
      <div className="main-content_itss">
        <Header title={displayComponent} />
        <main>
          <Switch>
            <Route exact path="/">
              <DashboardComponent {...props}/>
            </Route>
            <Route exact path="/Users">
              <UserListComponent {...props}/>
            </Route>
            <Route exact path="/Companystatus">
              <Companystatus {...props}/>
            </Route>
            <Route exact path="/Companystatuss">
              <Companystatuslist {...props}/>
            </Route>
            
            <Route exact path="/useredit">
              <UserComponent {...props}/>
            </Route>
            <Route exact path="/Recommendations">
              <RecommendationList {...props}/>
            </Route>
            <Route exact path="/recommendationedit">
              <RecommendationComponent {...props}/>
            </Route>
            <Route exact path="/Projects">
              <Stocksnews {...props}/>
            </Route>
            <Route exact path="/Projectss">
              <Stocksnewslist {...props}/>
            </Route>
            <Route exact path="/individualnews">
              <Individualnews {...props}/>
            </Route>
            <Route exact path="/recommendationedit">
              <RecommendationComponent {...props}/>
            </Route>
            <Route exact path="/Task">
              <Stepperimp {...props}/>
            </Route>
          </Switch>
        </main>
      </div>
      </Rounter>
    
  )
}

const mapStateToProps=(state:any)=>{
return {
  users:state.users
}
}
const mapdispatcherToProp=(dispatch:any)=>{
  return {
    //addusers :(users:any)=> dispatch(addusers(users))
  }
}
export default connect(mapStateToProps,mapdispatcherToProp)(Dashboard);
