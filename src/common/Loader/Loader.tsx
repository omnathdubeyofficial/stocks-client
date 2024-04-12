import React from 'react'
import ReactDOM from 'react-dom'
import './loader.css'

export const Loader = (props:any) => {
    const {display} = props
    if(display){
    return ReactDOM.createPortal(
        <div className="loader-container_itss">
            <div className="center">
                <div className="ring"></div>
                <span>Loading...</span>
            </div>
        </div>,
        document.getElementById("root")
    )}else{
        return <></>
    }
}



export default React.memo(Loader)
