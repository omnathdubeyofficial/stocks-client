import React, { useEffect, useState } from 'react'
import Step from './Step'
import "./stepper.css"
function Stepper(props: any) {
    const [displayAlert, setDisplayAlert] = useState(false);
   const onBackButtonClick = (index:number) => {
    if(index !== 0){
        console.log("form"+(index))
        console.log("form"+(index+1))
        const form1:any = document.getElementById("form"+(index+1))
        const form2:any = document.getElementById("form"+(index))
        form2.style.left = "30px";
        form1.style.left = "100%";
        const progress:any = document.getElementById("progress")
        progress.style.width =`calc(((100%) / 3 ) * ${index})`;
    }
   }
   const onNextButtonClick = (index:number) => {
    if(index !== props.children.length-1){
        const form1:any = document.getElementById("form"+(index+1))
        const form2:any = document.getElementById("form"+(index+2))
        form1.style.left = "-100%";
        form2.style.left = "30px";
        const progress:any = document.getElementById("progress")
        progress.style.width =`calc(((100%) / 3 ) * ${index+2})`;
    }
   }
    return (
        <div className="stepper-container_itss">
            {props.children.map((ele:any,i:number)=>(<div className="step-form" id={"form"+(i+1)}>
            <h3>{ele.props.title}</h3>
                {ele.props.children}
                <div className="btn_itss-box">
                {i>0?<button type="button" id={"back"+(i+1)} onClick={()=>onBackButtonClick(i)}>Back</button>:<></>}
                {i !== props.children.length-1 ?<button type="button" id={"next"+(i+1)} onClick={()=>{onNextButtonClick(i)}}>Next</button>:<></>}
                { i === props.children.length-1 ?<button type="button" id={"back"+(i+1)}>Submit</button>:<></>} 
            </div>
            </div>))}
        <div className="step-row">
        <div id="progress"></div>
            {props.children.map((ele:any, i:number) => (<Step name={ele.props.name}/>)
            )
            }
        </div>
        </div>
    )
}

export default React.memo(Stepper)