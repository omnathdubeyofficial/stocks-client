import React, { useState,useEffect,useRef } from 'react'
import { AnyIfEmpty, connect } from 'react-redux'
import DatePicker from '../../common/DatePicker'
import { FlatInput } from '../../common/InputFields/Input'
import * as doctypes from '../../common/Doctypes';
import saveUser from '../../common/mutations/savestocksnews'
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import shortid from 'shortid'
import { deleteDocument,saveDocument,addusers } from '../../ITFs/Redux/ActionCreators'
import deleteUser from '../../common/mutations/deletestocksnews';
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
import usersQuery from '../../common/queries/stocksnews'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'
import useSaveAction from '../../common/Hooks/useSaveAction'
import Loader from '../../common/Loader/Loader'
import {initDocumentstatus,newDocument} from '../../common/constant'
import {runCheck,requiredCheck,getDtFormat,getTimeFormat,getFromToDate,getDateYYYYMMDDHHMI,getDateYYYYMMDD,maxLength40,maxLength128,setErrorValue,getValue,setValue} from '../../common/validationlib';
 import {Redirect,withRouter } from 'react-router-dom'
import AppbarBottom from '../../common/AppbarBottom'
import { M__Textarea } from '../../common/InputFields/newtextarea';


const handleSave = async (currentdocument: any) => {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    let userForSave = {
      z_id:nvl(currentdocument.z_id, ''),
      applicationid: '15001500',
      client: '45004500',
      lang: 'EN',
      news: nvl(currentdocument.news, ''),
      delimeter : nvl(currentdocument.delimeter, ''),
      delimetercount : nvl(currentdocument.delimetercount, ''),
      newsdate : nvl(currentdocument.newsdate, ''),
      isread : nvl(currentdocument.isread, ''),
      t_id:nvl(currentdocument.t_id, '')
    }
    result = await execGql('mutation', saveUser, userForSave)
  }

  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {
    console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
    // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
    return result.data;
  }
}


export async function getUsers1(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    console.log("Executing getUsers1 with values:", values);

    result = await execGql('query', usersQuery, values);
    console.log("Query executed successfully. Result:", result);
  }
  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log("Error occurred while executing getUsers1:", { "errors": errors, "errorMessage": errorMessage });
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  if (!result) {
    console.log("No result returned from getUsers1. Returning empty array.");
    console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' });
    return [];
    // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
  }
  else {
    console.log("Returning data from getUsers1:", result.data.stocksnews);
    return result.data.stocksnews;
  }
}

export const handleSaveCheck = (currentdocument:any, stocknews:any) => {
  const { touched, news, validatemode } = currentdocument;
  let isNew = false;
  let news_check = runCheck(nvl(news, ''), [requiredCheck]); 

  let docid:string;

  if (currentdocument.z_id == null || currentdocument.z_id == '') {
    docid = 'NO-ID'
  }
  else {
    docid = currentdocument.z_id
  }


  if (stocknews != null) {

    stocknews.forEach(
      (user:any) => {
        if (user.news == news && user.z_id != docid && news_check == '') {
          news_check = 'stocksnews already in Use';
        }
      }
    )

  }



  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      news: news_check    }



  }


  if (validatemode == 'touch' && touched != null) {

    currentdocument.errorsAll = {
      news: checkTouched(nvl(touched.news, false), news_check)
      
    }
  }

  return currentdocument;
}
export const UserComponent = (props: any) => {
  const doctype= doctypes.USER;
  const doctypetext= 'stocksnews';
  const resetFocus =()=>{
    setTimeout(()=>inpref.current.focus(),1000)
   }
  const [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, goBack,closeSnackBar,loaderDisplay, setloaderDisplay]:any = useSaveAction(handleSave,handleSaveCheck,doctype,doctypetext,resetFocus,deleteUser)
  const inpref:any = useRef(0)

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); 
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = today.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;

  const defaultDocumentValues = {
    delimeter: '*',
    delimetercount: '1',
    newsdate: formattedDate,
    news: ' News Text',
    // Add default values for other fields as needed
  };
  
  let z_id=new URLSearchParams(props.location.search).get("z_id")  
  useEffect(() => {
    if (z_id !== 'NO-ID') {
        setloaderDisplay(true);

        getUsers1({
            "applicationid": "15001500",
            "client": "45004500",
            "lang": "EN",
            "z_id": z_id
        }).then((resp) => {
            setloaderDisplay(false);
            console.log("res******", resp);
            if (resp && resp.length > 0) {
                modifydocument(resp[0]);
            } else {
                // Handle empty response here
                console.log("Empty response received from getUsers1");
            }
        }).catch((error) => {
            // Handle errors from getUsers1
            console.error("Error fetching data from getUsers1:", error);
        });
    } else {
        modifydocument(newDocument(doctype, doctypetext));
    }
    inpref?.current?.focus();
    return () => {};
}, [z_id]);
const mergedDocument = { ...defaultDocumentValues, ...currentdocument };

    console.log("documentstatus===>2",documentstatus)
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  if(redirect){
    let redirectpath='/Projectss'
    return <Redirect push to={redirectpath} />;   
  }else
  return (
    <>
    <Loader display={loaderDisplay}/>
    <div className="container_itss">
          <div className="grid_itss">     
            <div className="row_itss">
            <FlatInput inpref={inpref} wd="4" label="Delimeter" name="delimeter" currdoc={mergedDocument} section={'delimeter'} modifydoc={modifydocument} />
            <DatePicker wd="4" label="Date" name="newsdate" currdoc={mergedDocument} section={'newsdate'} modifydoc={modifydocument} />
<FlatInput wd="4" label="Delimeter Count" name="delimetercount" currdoc={mergedDocument} section={'delimetercount'} modifydoc={modifydocument} />
            </div>

            <div className="row_itss">

            <M__Textarea  wd="12" label=""  name="news" currdoc={mergedDocument} section={'news'} modifydoc={modifydocument}/>      

      
        <div className="col_itss-3"></div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#fff', // White text
        backgroundColor: '#007bff', // Blue background
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => goBack(true)}>Back</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#fff', // White text
        backgroundColor: '#28a745', // Green background
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('clear')}>Clear</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#fff', // White text
        backgroundColor: '#dc3545', // Red background
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('delete')}>Delete</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#fff', // White text
        backgroundColor: '#ffc107', // Yellow background
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('save')}>Save</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#fff', // White text
        backgroundColor: '#6c757d', // Gray background
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('save_new')}>Save +</button>
</div>


          </div>
          <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
          <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
        </div>
             {/*   <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus} />*/}

      </>
  )
}

const mapStateToProps = (state: any) => {

  return({
    stocknews:state.documents.stocknews,
   currentcmpn:state.documents.currentcmpn,
  docnos:state.documents.docnos,
  companies:state.documents.companies,
  //transactionconfig:state.configs.configs[state.documents.currentcmpn][doctypes.INV001],
})}

const mapDispatchToProps = (dispatch: any) => {
  return {
            
    deleteDocument: (document:any,callback:any) => {dispatch(deleteDocument(document));   
      if(callback && typeof callback === "function") {
  callback();
  }},
  
  
  saveDocument:(document:any,callback:any) => {dispatch(saveDocument(document)); 
    if(callback && typeof callback === "function") {
      callback();
  } },


    addusers: (stocknews:any,callback:any) => { dispatch(addusers(stocknews));   
    if(callback && typeof callback === "function") {
callback();
}}

  
    }
}

export default React.memo(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserComponent)))
