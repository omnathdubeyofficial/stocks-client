
import React, { useMemo,useCallback } from 'react'
import Table from '../../common/table/Table'
import Column from '../../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import fetchGQL from '../../common/queries/stocksnews'
import deleteGQL from '../../common/mutations/deletestocksnews'
import useTableAction from '../../common/Hooks/useTableAction'
import {useAltKey,useKey} from '../../common/shortcurkeys'
import Loader from '../../common/Loader/Loader'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'

function BuyerList() {

   const fetchquery = useMemo(()=>(fetchGQL),[1])
   const deletequery = useMemo(()=>(deleteGQL),[1])
   useAltKey("n",() =>{setDocStatus("NO-ID",true)})
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar,getTableData,setloaderDisplay,setTableData,setDocumentstatus]:any=useTableAction(fetchquery,"stocksnew",deletequery)

   
   let tabledata:any=[]
   if(tableData) {
    tabledata= useMemo(()=>tableData,[loaderDisplay])
   }
   const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id,redirect) => {setDocStatus(id,redirect)},[1])

  const truncatedNews = useMemo(() => {
    return tableData.map(item => {
      return { ...item, news: item.news.split(' ').slice(0, 10).join(' ') + '.......' };
    });
  }, [tableData]);


  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  
  

  if (redirect) {
    let redirectpath = '/Projects?z_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
    <div className="projects">
    <div className="card_itss">
      <div className="card-body">
          <div className="card-body">
          <Table
                data={truncatedNews}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="stocksnews"
                 addNew={M_setDocStatus}
                 onRowClick={M_setDocStatus}
                 
                actions={[
                  {
                    action: (id: String) => {
                        deleteDocument(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  }
                ]}
                >
                <Column fieldname="news" columnname="News"></Column>
                <Column fieldname="delimeter" columnname="Delimeter"></Column>
                <Column fieldname="delimetercount" columnname="Delimeter Count"></Column>
                <Column fieldname="newsdate" columnname="News Date"></Column>

              </Table>     
        </div>
        </div>
        
         <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

        </div>
        </div>
    )
}

export default BuyerList
