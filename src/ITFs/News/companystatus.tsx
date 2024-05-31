import { useState, useEffect, useMemo, useRef } from 'react'
import DatePicker from '../../common/DatePicker'
import { FlatInput } from '../../common/InputFields/Input'
import { SelectInput } from '../../common/InputFields/Select'
import { SearchSelectInput } from '../../common/InputFields/SearchSelect'
import * as doctypes from '../../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import useSaveAction from '../../common/Hooks/useSaveAction'
import { handleDelete, getRecommendations, handleSave,handlesendRecommendationNotification } from './Crudcompanystatus'
import Messagesnackbar from '../../common/Alert'
import AlertDialog from '../../common/PopupModals/ConfirmationModal'
import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue
} from '../../common/validationlib';
import { Redirect, withRouter } from 'react-router-dom'
import AppbarBottom from '../../common/AppbarBottom'
import { initDocumentstatus } from '../../common/constant'
import { fetchStocks, addstocks } from '../Redux/ActionCreators'
import { connect } from 'react-redux';
import * as ActionTypes from '../Redux/ActionTypes'
import Loader from '../../common/Loader/Loader'
import deleteGQL from '../../common/mutations/deletecompanystatus'
import { FileuploadComponent } from '../../common/FileuploadComponent'
import { OnlineFileuploadComponent } from '../../common/OnlineFileuploadComponent'
import shortid from 'shortid'
import { M__Textarea } from '../../common/InputFields/newtextarea'
import Companystatuslist from './companystatuslist'

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
  const { touched, companyname,status,reviewdate,  validatemode } = currentdocument;

  
console.log('nvl(target1, )',runCheck(nvl(companyname, ''), [requiredCheck]))

  let companyname_check = runCheck(nvl(companyname, ''), [requiredCheck]);
  let status_check = runCheck(nvl(status, ''), [requiredCheck]);
  let reviewdate_check = runCheck(nvl(reviewdate, ''), [requiredCheck]);
  


  console.log('currentdocument.errorsAll',currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      companyname: companyname_check,
      status: status_check,
      reviewdate: reviewdate_check,
    }
    validatemode == 'touch' 
  }
  if (validatemode == 'touch' && (touched != null || touched!=undefined)) {
    currentdocument.errorsAll = {
      companyname: checkTouched(nvl(touched.companyname, false), companyname_check),
      status: checkTouched(nvl(touched.status, false), status_check),
      reviewdate: checkTouched(nvl(touched.reviewdate, false), reviewdate_check)
   
    }
  }


  return currentdocument;
}

const timeframeoptions = [{ 'key': 'Hold', 'value': 'Hold' },
{ 'key': 'Blacklist', 'value': 'Blacklist' },
{ 'key': 'Review', 'value': 'Review' }
]
export const RecommendationComponent = (props: any) => {
  const compinp: any = useRef(null);
  const doctype = doctypes.RECOMMENDATION;
  const doctypetext = '';
  const resetFocus = () => {
    setTimeout(() => compinp.current.focus(), 1000);
  };
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteGQL);
  const [stocklist, setstocklist] = useState([]);
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
  const getStockcmp = () => {
    setloaderDisplay(true); compinp.current.focus()
    fetchStocks({},

      (err: any, result: any): any => {
        if (err == '') { console.log(result); props.addstocks(result); setloaderDisplay(false) }
        else { console.log(err, result) }
      })
  }

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  if (stocklist && props ?.stocks && stocklist ?.length !== props ?.stocks ?.length) {
    setstocklist(props.stocks.map((el: any) => { return { value: el.name, label: el.name } }));
  }




  const M_stocklist = useMemo(() => stocklist, [stocklist])
  if (redirect) {
    let redirectpath = '/Companystatuss'
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
              <SearchSelectInput inpref={compinp} wd="3" label="" options={M_stocklist} name="companyname" currdoc={currentdocument1} section={'companyname'} modifydoc={modifydocument} refresh={getStockcmp} />
              <DatePicker wd="3" label="Review Date" name="reviewdate" currdoc={currentdocument1} section={'reviewdate'} modifydoc={modifydocument} />
              <SelectInput wd="3" label="Status" options={timeframeoptions} name="status" currdoc={currentdocument1} section={'status'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
      <M__Textarea  wd="12" label=""  name="comment" currdoc={currentdocument1} section={'comment'} modifydoc={modifydocument}/>      
      
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




<Companystatuslist/>
          <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
          <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
        </div>
   
      {/*  <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus} />*/}
 
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

