import React, { useMemo, useEffect, useState,useRef } from 'react'
import { connect } from 'react-redux'
import AddFabButton from '../common/Fab/AddFabButton'
import Table from '../common/table/Table'
import Column from '../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import {addusers} from '../Redux/ActionCreators'
//import { getRecommendations } from '../Redux/reducers/actions'
import useSaveAction from '../../common/Hooks/useSaveAction'
import * as doctypes from '../common/Doctypes';
import {useAltKey,useKey} from '../../common/shortcurkeys'
import Loader from '../common/Loader/Loader'
import {handleDelete, getRecommendations,handleSave} from './CrudRecommendation'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../common/PopupModals/ConfirmationModal'
export const RecommendationListComponent = (props: any) => {
const inpref:any = useRef(0)
  const{recommendatios} = props
  const [docno, setDocno] = useState('NO-ID')
  const doctype= doctypes.RECOMMENDATION;
  const doctypetext= 'Recommendation';
  const resetFocus =()=>{
    setTimeout(()=>inpref.current.focus(),1000)
   }
  const [recommendations, setRecommendations] = useState([])
  const [loaderDisplay, setloaderDisplay] = useState(false)
  const [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, setRedirect,closeSnackBar]:any = useSaveAction(handleDelete, handleSave,()=>{},doctype,doctypetext,resetFocus)
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }
const loadDataTable=()=>{
  setloaderDisplay(!loaderDisplay)
    getRecommendations({applicationid:'15001500',client:'45004500',lang: 'EN'}).then((data:any)=>{
        setRecommendations(data)
        setloaderDisplay(loaderDisplay)
        inpref.current.focus()
    });
}
  useEffect(() => {
    loadDataTable();
    return () => {
      
    }
  }, [])
  let tabledata:any = []
  if(recommendations){
    tabledata =useMemo(() => [...recommendations], [])
}
useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = '/recommendationedit?z_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
    return (
      <div className="projects">
        <Loader display={loaderDisplay}/>
        <div className="card_itss">
          <div className="card-body">
            
              <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                addNew={setDocStatus}
                onRowClick={setDocStatus}
                searchref={inpref}
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
                    action: (id: any) => {
                      currentdocument["z_id"]=id;
                      setDocumentAction('delete')
                      loadDataTable();
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
        </div>
        <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
      <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>
        <AddFabButton action={setDocStatus} />
      </div>
    )
}

// const mapStateToProps = (state: any) => {
//   const recdoc = state?.documents?.documents?.filter((document:any) => document.doctype==doctypes.RECOMMENDATION )
//   return({
//   users: state.documents.users,
//   docnos: state.documents.docnos,
//   companies: state.documents.companies,
//   recommendations:recdoc
// })}

// const mapdispatcherToProp=(dispatch:any)=>{
//   return {
//     addusers :(users:any)=> dispatch(addusers(users))
//   }
// }
export default withRouter(
  connect(null,null)(RecommendationListComponent)
)
