import React from 'react'
import './AppbarBottom.css'
import {useAltKey,useKey} from './shortcurkeys'
function AppbarBottom(props:any) {
  const { setAction,handleGoback }=props;
  useAltKey("c",() =>{setAction('clear')})
  useAltKey("b",() =>{handleGoback(true)})
  useAltKey("s",() =>{setAction('save')})
  useAltKey("d",() =>{setAction('delete')})
  useAltKey("x",() =>{setAction('save_new')})
  useKey("Enter",() =>{setAction('save')})
  return (
    <div className="nav_itss-container_itss">
    <nav className="nav_itss">
      <a  className="nav_itss__link" onClick={() =>{handleGoback(true)}}>
        <i className="fas fa-angle-left"/>
        <span className="nav_itss__text">Back</span>
      </a>
      <a href="#" className="nav_itss__link nav_itss__link--active" onClick={() =>{setAction('clear')}}>
        <i className="fas fa-redo"/>
        <span className="nav_itss__text">Clear</span>
      </a>
      <a href="#" className="nav_itss__link" onClick={()=>{setAction('delete')}}>
        <i className="fas fa-trash"/>
        <span className="nav_itss__text">Delete</span>
      </a>
      <a href="#" className="nav_itss__link" onClick={()=>{setAction('save')}}>
        <i className="fas fa-save"/>
        <span className="nav_itss__text">Save</span>
      </a>
      <a href="#" className="nav_itss__link" onClick={()=>{setAction('save_new')}}>
      <i className="fas fa-plus-square"></i>
        <span className="nav_itss__text">Save +</span>
      </a>
    </nav>
    </div>
  )
}

export default React.memo(AppbarBottom)
