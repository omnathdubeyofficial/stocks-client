import React, { useMemo,useCallback } from 'react'
import Table from '../../common/table/Table'

import Column from '../../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import fetchGQL from '../../common/queries/recommendationQuery'
import deleteGQL from '../../common/mutations/DeleteRecommendation'
import useTableAction from '../../common/Hooks/useTableAction'
import {useAltKey,useKey} from '../../common/shortcurkeys'
import Loader from '../../common/Loader/Loader'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'

function RecommendationList1() {

   const fetchquery = useMemo(()=>(fetchGQL),[1])
   const deletequery = useMemo(()=>(deleteGQL),[1])
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]:any=useTableAction(fetchquery,"recommendation",deletequery)
   
   let tabledata:any=[]
   if(tableData) {
    tabledata= useMemo(()=>tableData,[loaderDisplay])
   }
   const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id,redirect) => {setDocStatus(id,redirect)},[1])
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = '/recommendationedit?z_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
        <div className="card_itss">
            <Loader display={loaderDisplay}/>
          <div className="card-body">
          <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                 addNew={M_setDocStatus}
                 onRowClick={M_setDocStatus}
                 
                actions={[
                  // {
                  //   action: (id: any) => {
                  //     setDocStatus(id, true)
                  //   },
                  //   icon: 'fas fa-edit',
                  //   text: 'Edit',
                  //   className: 'table-button submit',
                  // },
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
                <Column fieldname="name" columnname="Name"></Column>
                <Column fieldname="timeframe" columnname="Time Frame"></Column>
                <Column fieldname="target1" columnname="Target 1"></Column>
                <Column fieldname="target2" columnname="Target 2"></Column>
                <Column fieldname="target3" columnname="Target 3"></Column>
              </Table>
              
        </div>
        <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

        </div>
    )
}


export default RecommendationList1
