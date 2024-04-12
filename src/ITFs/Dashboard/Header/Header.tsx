import React, { useContext } from 'react'
import usering from '../../../img/2.jpg'
import { connect } from 'react-redux'
export  function Header(props: any) {
  const { title,authuser } = props
  return (
    <header>
      <h2>
        <label htmlFor="nav_itss-toggle">
          <span className="las la-bars"></span>
        </label>
        {title}
      </h2>
      <div className="search_itss-wrapper">
        <span className="las la-search"></span>
        <input type="search" placeholder="Search here" />
      </div>
      <div className="user_itss-wrapper">
        <img src={usering} alt="" width="40px" height="40px" />
        <div>
          <h4>{authuser?.firstname ? authuser.firstname +" "+ authuser.lastname:authuser.username}</h4>
          <small>super admin</small>
        </div>
      </div>
    </header>
  )
}


const mapStateToProps = (state: any) => ({
  authuser:state.auth.authuser
})



export default 
  connect(mapStateToProps)(Header)
