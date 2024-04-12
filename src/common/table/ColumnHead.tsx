import React,{useState} from 'react'

function ColumnHead(props:any) {
    const [order, setOrder] = useState("")
    const {fieldname,selectColumn,selectedcolumn,width}=props
    function setColumnOrder(fieldname:string){
        selectColumn(fieldname,order)
        if(order==="desc") setOrder("asc"); else setOrder("desc") 
    }
    return (
        <td onClick={()=>setColumnOrder(fieldname)} width={width}>
            {props.children} <i className={order===""  ?"" : selectedcolumn===fieldname? (order==="desc" ?"las la-caret-up":"las la-caret-down"):""}></i>
        </td>
    )
}

export default ColumnHead
