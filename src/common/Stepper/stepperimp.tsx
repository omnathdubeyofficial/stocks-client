import React, { useEffect, useState } from 'react'
import Stepper from './Stepper'
import Step from './Step'
function Stepperimp(props:any) {
    const [displayAlert, setDisplayAlert] = useState(false);
    
    return (
        <Stepper>
        <Step name={"Step 1"} title="Create Account">
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
        </Step>
        <Step name={"Step 2"} title="Social Links">
        
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            
        </Step>
        <Step name={"Step 3"} title="Personal Info">
        
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Email" required />
           
        
        </Step>
        </Stepper>
    )
}

export default React.memo(Stepperimp)