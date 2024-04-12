import React, { useEffect, useRef } from "react";

export const useAltKey= (key: any, cb: any)=>
{
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    }
    );

    useEffect(() => {
     
        const handle = (event: any) => {
            console.log(event.key,event.ctrlKey,event)
        
           
            if (event.key === key && event.altKey) {
                callbackRef.current(event);
            }

        
        
        
        }

        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle)
    }, [key])

}



export const useKey= (key: any, cb: any)=>
{
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    }
    );

    useEffect(() => {
     
        const handle = (event: any) => {
           console.log(event.key,event.ctrlKey,event)
        
           
            if (event.key === key ) {
                callbackRef.current(event);
            }

        
        
        
        }

        document.addEventListener("keypress", handle);
        return () => document.removeEventListener("keypress", handle)
    }, [key])

}