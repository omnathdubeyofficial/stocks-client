import React, { useState, useEffect, useRef } from 'react'
import Column from './Column'
import ColumnHead from './ColumnHead'
import { Pagination } from './Pagination';
import SMIconButton from './SMIconButton';
function Table(props: any) {
    let { data, actions, actionColWidth, headerText, addNew, onRowClick } = props
    const [selectedColumn, setSelectedColumn] = useState("");
    const [order, setOrder] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [filterdata, setFilter] = useState([]);
    const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(50)
    const searchref: any = useRef(0)
    function sortSelectedColumn(selectedcolumn: string, order: string) {
        setOrder(order);
        setSelectedColumn(selectedcolumn)
    }
    useEffect(() => {
        setFilter(data)
        if (searchref.current.focus) {
            searchref.current.focus()
        }
    }, [data])


    filterdata?.sort(compare)
    function compare(a: any, b: any) {
        if (order === "asc") {
            if (a[selectedColumn] < b[selectedColumn]) {
                return -1;
            }
            if (a[selectedColumn] > b[selectedColumn]) {
                return 1;
            }
            return 0;
        } else {
            if (a[selectedColumn] > b[selectedColumn]) {
                return -1;
            }
            if (a[selectedColumn] < b[selectedColumn]) {
                return 1;
            }
            return 0;
        }
    }
    let pageData: any = []

    for (let i = (activePage - 1) * numberOfRecordsPerPage; i < (((activePage - 1) * numberOfRecordsPerPage) + numberOfRecordsPerPage) && i < filterdata.length; i++) {
        pageData?.push(filterdata[i])
    }
    const globalSearch = (searchtext: string) => {
        let keys = Object.keys(data[0])
        let filteredData: any = []
        for (let i = 0; i < data.length; i < i++) {
            for (let key of keys) {

                if (data[i][key] != null) {
                    if (typeof (data[i][key]) == 'string') {
                        if ((data[i][key])?.toLowerCase()?.includes(searchtext?.toLowerCase())) {
                            filteredData.push(data[i])
                            break;
                        }
                    }

                }
            }
        }
        setFilter(filteredData);

    }
    return (

        <>

            {/* {renderChildren(props.children)} */}

            <div className="card-header">
                {/* <div className="table-header-text">
                            <h3>{headerText}</h3><span>({data.length})</span>
                        </div> */}
               {/* <div className="goble-search"><input ref={searchref} placeholder="search" style={{ height: '40px', fontSize: "16px" }} onChange={(e) => { globalSearch(e.target.value) }} /><i className="fas fa-search" /></div>*/}

                <div className="goble-search"><input ref={searchref} placeholder="search" style={{ height: '40px', fontSize: "16px" }} onChange={(e) => { globalSearch(e.target.value) }} /><i className="fas fa-search" /></div>
{/*
                <div>
                    <input type="text" className="form-control" placeholder='recocompany' />
                    </div> 

                <button type="button" className="btn btn-primary m-3">Save</button>*/}

                <button className="tabel-add-button" onClick={() => addNew("NO-ID", true)}>Add new <span className="las la-arrow-right"></span></button>


            </div>
            <div className="card-body">
                <div className="table-response">
                    <table width="100%">
                        <thead>
                            <tr>{props.children.map((ele: any, i: any) => (<ColumnHead selectColumn={sortSelectedColumn} key={i + "_" + ele.props.fieldname} fieldname={ele.props.fieldname} selectedcolumn={selectedColumn} width={ele.props.width}>{ele.props.columnname}</ColumnHead>))}
                                {actions?.length > 0 ? <ColumnHead width={actionColWidth} selectColumn={() => { }}>Action</ColumnHead> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {pageData?.map((data: any, i: any) => {
                                return (<tr key={"#" + i} >{props.children.map((ele: any, j: any) => {
                                    const { fieldname, columnname, render = null, width } = ele.props

                                    return <Column key={j + "#" + fieldname} data={data && data[fieldname] ? data[fieldname] : ""} columnClick={onRowClick} id={data.z_id} render={render} />
                                })}
                                    {<Column data={<div className="table-button-container_itss">{actions.map((action: any, k: any) => {
                                        return (<SMIconButton key={k + "#" + action.icon} action={action.action} id={data && data["z_id"] ? data["z_id"] : ""} icon={action.icon} className={action.className} />)
                                    })}</div>} />
                                    }
                                </tr>)
                            })


                            }</tbody></table>
                </div>
            </div>

            <Pagination
                number={Math.ceil(filterdata.length / numberOfRecordsPerPage)}
                activePage={activePage} setActivePage={setActivePage}
                numberOfRecordsPerPage={numberOfRecordsPerPage}
                setNumberOfRecordsPerPage={setNumberOfRecordsPerPage}
                total={filterdata.length}
            />

        </>
    )
}

export default React.memo(Table)
