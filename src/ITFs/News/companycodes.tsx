import { useState, useEffect, useMemo, useRef } from 'react'
import { FlatInput } from '../../common/InputFields/Input'
import { SelectInput } from '../../common/InputFields/Select'
import * as doctypes from '../../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import useSaveAction from '../../common/Hooks/useSaveAction'
import { handleDelete, getRecommendations, handleSave } from './Crudcompanycodes'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'

import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue
} from '../../common/validationlib';
import { Redirect, withRouter } from 'react-router-dom'
import { fetchStocks, addstocks } from '../Redux/ActionCreators'
import { connect } from 'react-redux';
import * as ActionTypes from '../Redux/ActionTypes'
import Loader from '../../common/Loader/Loader'
import deleteGQL from '../../common/mutations/deletecompanycodes'
import shortid from 'shortid'
import { M__Textarea } from '../../common/InputFields/newtextarea'
import Companycodeslist from './companycodelist'

const newDocument = (doctype: String, doctypetext: String) => {
  return {
    doctype,
    doctypetext,
    status: 'active',
    validatemode: 'touch',
    uploadfiles: [],
    onlineuploadfiles: [],
    t_id: shortid.generate()
  }
};

export const handleSaveCheck = (currentdocument: any) => {
  const { touched, code_code,  validatemode } = currentdocument;

  
console.log('nvl(target1, )',runCheck(nvl(code_code, ''), [requiredCheck]))

  let code_code_check = runCheck(nvl(code_code, ''), [requiredCheck]);

  


  console.log('currentdocument.errorsAll',currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      code_code: code_code_check,

    }
    validatemode == 'touch' 
  }
  if (validatemode == 'touch' && (touched != null || touched!=undefined)) {
    currentdocument.errorsAll = {
      code_code: checkTouched(nvl(touched.code_code, false), code_code_check),
   
    }
  }


  return currentdocument;
}

const timeframeoptions = [{ 'key': 'test1', 'value': 'test1' },
{ 'key': 'test2', 'value': 'test2' },
{ 'key': 'test3', 'value': 'test3' },
{ 'key': 'Stockstatus', 'value': 'Stockstatus' }
]
export const RecommendationComponent = (props: any) => {
  const compinp: any = useRef(null);
  const doctype = doctypes.RECOMMENDATION;
  const doctypetext = 'Companycodes';
  const resetFocus = () => {
    setTimeout(() => compinp.current.focus(), 1000);
  };
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteGQL);
  const [z_id, setZ_id] = useState(new URLSearchParams(location.search).get("z_id"));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newZ_id = searchParams.get("z_id");
    setZ_id(newZ_id);
  }, [location.search]);

  useEffect(() => {
    compinp.current.focus();

    if (z_id && z_id !== 'NO-ID') {
      setloaderDisplay(true);
      getRecommendations({ applicationid: '15001500', client: '45004500', lang: 'EN', z_id }).then((data: any) => {
        modifydocument(data[0]);
        setloaderDisplay(false);
      });
    } else if (z_id === 'NO-ID') {
      modifydocument(newDocument(doctype, doctypetext));
    }
  }, [z_id]);
  

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
 



  if (redirect) {
    let redirectpath = '/Companycodess'
    return <Redirect push to={redirectpath} />;
  } else

  {

    let currentdocument1=handleSaveCheck(currentdocument);

    return (
      <>
         <Loader display={loaderDisplay} />
        <div className="container_itss">
          <div className="grid_itss">
          <div className="row_itss">
          <SelectInput  wd="6" label="Code Type" options={timeframeoptions} name="code_type" currdoc={currentdocument1} section={'code_type'} modifydoc={modifydocument} />

          <FlatInput inpref={compinp} wd="6" label="Code" name="code_code" currdoc={currentdocument1} section={'code_code'} modifydoc={modifydocument} />
            </div>
            <div className="row_itss">
<M__Textarea  wd="4" label="Description1"  name="code_desc" currdoc={currentdocument1} section={'code_desc'} modifydoc={modifydocument}/>      
<M__Textarea  wd="4" label="Description2"  name="code_desc1" currdoc={currentdocument1} section={'code_desc1'} modifydoc={modifydocument}/>      
<M__Textarea  wd="4" label="Description3"  name="code_desc2" currdoc={currentdocument1} section={'code_desc2'} modifydoc={modifydocument}/>            
            </div>
          </div>
      
          <div style={{ display: 'flex', gap: '10px' }}>
    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#000', // Changed color to black for better contrast
        backgroundColor: '#f0f0f0', // Light color
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => goBack(true)}>Back</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#000', // Changed color to black for better contrast
        backgroundColor: '#f0f0f0', // Light color
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('clear')}>Clear</button>

    <button style={{
        padding: '10px 20px',
        textTransform: 'uppercase',
        color: '#000', // Changed color to black for better contrast
        backgroundColor: '#f0f0f0', // Light color
        border: 'none',
        borderRadius: '5px',
    }} onClick={() => setDocumentAction('save')}>Save</button>
</div>

<Companycodeslist/>      <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
          <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
        </div>
   
 
      </>
    )

  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addstocks: (stocks: any, callback: any) => {
    console.log(addstocks(stocks)); dispatch(addstocks(stocks));
    if (callback && typeof callback === "function") {
      callback();
    }
  }
})

const mapStateToProps = (state: any) => {

  return {
    stocks: state.stocks.stocks.stocks,

  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendationComponent));

