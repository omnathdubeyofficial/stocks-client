import React, { useState } from 'react'
import './table.css'
function Pagination_N(props: any) {
    const { number ,setActivePage,activePage,setNumberOfRecordsPerPage,numberOfRecordsPerPage,total} = props;
    const [input, setInput] = useState("1")
    const arr = []
    const onChange = (e: any) => {
        {
            
            setInput(e.target.value)

            if (parseInt(e.target.value) < number) {
                if (Number.isInteger(parseInt(e.target.value))) {
                    setTimeout(setActivePage(parseInt(e.target.value)), 1000)
                }
            } else {
                if (e.target.value === "") {
                    setInput("")
                } else {
                    setInput(number)
                    setTimeout(setActivePage(parseInt(e.target.value)), 1000)
                }
            }
        }
    }
    
    const changePage = (page:string) =>{
        if (parseInt(page) < number+1) {
        setInput(page)       
        setActivePage((parseInt(page)))
        }   
    }
 
    return (
        
        
        <div className="pagination">
          <div className="page-of">Page {activePage} of {number} <span className='pagination-divider'> | </span> Total {total}</div>  
       <div className="pageination-section">
        <button className="pagination-btn" onClick={()=>changePage("1")}>{"<<"}</button>
        <button className="pagination-btn" onClick={()=>{activePage!==1?changePage((activePage-1)+""):''}}>{"<"}</button>
        <input value={input} onChange={(e) => {onChange(e)}} className="pagination-input"/>
        <button className="pagination-btn" onClick={()=>{changePage((activePage+1)+"")}}>{">"}</button>
        <button className="pagination-btn" onClick={()=>changePage((number)+"")}>{">>"}</button>    
        </div>
        <div className="item-per-page">
            <select onChange={(e)=>{setNumberOfRecordsPerPage(parseInt(e.target.value))}} value={numberOfRecordsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
        </div>
    )
}

export const Pagination = React.memo(Pagination_N)
