import React, { useEffect, useState } from 'react'
import "./stepper.css"
function Stepper({name}:any) {
    const [displayAlert, setDisplayAlert] = useState(false);
    
    return (
        <>
        <div className="step-col"><small>{name}</small></div>
        </>
    )
}

export default React.memo(Stepper)