import React, { useEffect, useState } from 'react'
import {useAltKey,useKey} from './shortcurkeys'
import './alert.css'
function Alert({snackbaropen,snackbarseverity,handlesnackbarclose,snackbartext}:any) {
    const [displayAlert, setDisplayAlert] = useState(false);
    useEffect(() => {
        if(snackbaropen){
        setDisplayAlert(snackbaropen)
       const timer = setTimeout(()=>{handlesnackbarclose();setDisplayAlert(false)},5000)
       return () => clearTimeout(timer);}
    }, [snackbaropen])
    return (
        <div className={displayAlert?`alert_itss ${snackbarseverity} show`:`alert_itss ${snackbarseverity} hide`}>
            <span className={snackbarseverity === 'success'? "fas fa-check-circle":"fas fa-exclamation-circle"}></span>
            <span className="msg">{snackbartext}</span>
            <span className="close-btn" onClick={()=>{handlesnackbarclose();setDisplayAlert(displayAlert)}}>
                <span className="fas fa-times"></span>
            </span>
        </div>
    )
}

export default React.memo(Alert)
