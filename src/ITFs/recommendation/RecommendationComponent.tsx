import { useState, useEffect, useMemo, useRef } from 'react'
import DatePicker from '../../common/DatePicker'
import { FlatInput } from '../../common/InputFields/Input'
import { M_Textarea } from '../../common/InputFields/textarea'
import  getGraphql  from '../../common/queries/recommendationnewQuery'
import { SelectInput } from '../../common/InputFields/Select'
import { SearchSelectInput } from '../../common/InputFields/SearchSelect'
import * as doctypes from '../../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import useSaveAction from '../../common/Hooks/useSaveAction'
import { handleDelete, getRecommendations,getRecommendations1, handleSave,handlesendRecommendationNotification } from './CrudRecommendation'
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
import deleteGQL from '../../common/mutations/DeleteRecommendation'
import { FileuploadComponent } from '../../common/FileuploadComponent'
import { OnlineFileuploadComponent } from '../../common/OnlineFileuploadComponent'
import shortid from 'shortid'
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
import { Comment } from '@material-ui/icons'


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
  const { touched, name, recodate, cmp, addupto, sl, target1, target2, weightage, timeframe, validatemode } = currentdocument;

  
console.log('nvl(target1, )',runCheck(nvl(target1, ''), [requiredCheck]))

  let name_check = runCheck(nvl(name, ''), [requiredCheck]);
  let recodate_check = runCheck(nvl(recodate, ''), [requiredCheck]);
  let cmp_check = runCheck(nvl(cmp, ''), [requiredCheck]);
  let addupto_check = runCheck(nvl(addupto, ''), [requiredCheck]);
  let sl_check = runCheck(nvl(sl, ''), [requiredCheck]);
  let target1_check = runCheck(nvl(target1, ''), [requiredCheck]);
  let target2_check = runCheck(nvl(target2, ''), [requiredCheck])
  let weightage_check = runCheck(nvl(weightage, ''), [requiredCheck]);
  let timeframe_check = runCheck(nvl(timeframe, ''), [requiredCheck]);
  console.log('currentdocument.errorsAll',currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      name: name_check,
      recodate: recodate_check,
      cmp: cmp_check,
      addupto: addupto_check,
      sl: sl_check,
      target1: target1_check,
      target2: target2_check,
      weightage: weightage_check,
      timeframe: timeframe_check,
    }
    validatemode == 'touch' 
  }
  if (validatemode == 'touch' && (touched != null || touched!=undefined)) {
    currentdocument.errorsAll = {
      name: checkTouched(nvl(touched.name, false), name_check),
      recodate: checkTouched(nvl(touched.recodate, false), recodate_check),
      cmp: checkTouched(nvl(touched.cmp, false), cmp_check),
      addupto: checkTouched(nvl(touched.addupto, false), addupto_check),
      sl: checkTouched(nvl(touched.sl, false), sl_check),
      target1: checkTouched(nvl(touched.target1, false), target1_check),
      target2: checkTouched(nvl(touched.target2, false), target2_check),
      weightage: checkTouched(nvl(touched.weightage, false), weightage_check),
      timeframe: checkTouched(nvl(touched.timeframe, false), timeframe_check),
    }
  }


  return currentdocument;
}

const timeframeoptions = [{ 'key': '0', 'value': '0' },
{ 'key': '1', 'value': '1' },
{ 'key': '3', 'value': '3' },
{ 'key': '6', 'value': '6' },
{ 'key': '12', 'value': '12' },
{ 'key': '12|18', 'value': '12|18' },
{ 'key': '12|24', 'value': '12|24' },
{ 'key': '3|6', 'value': '3|6' },
{ 'key': '3|6|9', 'value': '3|6|9' },
{ 'key': '3|6|9|12', 'value': '3|6|9|12' },
{ 'key': '3|9', 'value': '3|9' },
{ 'key': '6|24', 'value': '6|24' }
]

export const RecommendationComponent = (props: any) => {
  const compinp: any = useRef(0)
  const doctype = doctypes.RECOMMENDATION;
  const doctypetext = 'Recommendation';
  const resetFocus = () => {
    setTimeout(() => compinp.current.focus(), 1000)
  }
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteGQL)
  const [stocklist, setstocklist] = useState([])

  const currentdocumentRef = useRef(null);

  async function getRecommendationsObjects(values: any) {
    
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', getGraphql, values);
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' });
        return [];
      } else {
        console.log('GraphQL query successful. Result:', result.data.getRecommendations);
        return result.data.getRecommendations;
      }
    } catch (error) {
      console.error('Error fetching data from server:', error);
      return [];
    }
  }
  
  useEffect(() => {
    let z_id = new URLSearchParams(props.location.search).get("z_id");
    compinp.current.focus();
  
    if (z_id && z_id !== 'NO-ID') {
      setloaderDisplay(true);
  
      const fetchData = async () => {
        try {
          // First attempt to fetch data from getRecommendations1
          try {
            const data1 = await getRecommendations1({ applicationid: '15001500', client: '45004500', lang: 'EN', z_id });
            const values = {
              name: data1.recocompany,
              comment1: data1.companynews,
              recodate: data1.date
            };
            modifydocument(values);
          } catch (error1) {
            // If getRecommendations1 fails, fall back to getRecommendations
            try {
              const data2 = await getRecommendations({ applicationid: '15001500', client: '45004500', lang: 'EN', z_id });
              modifydocument(data2[0]);
            } catch (error2) {
              console.error('Error fetching data from both sources:', error2);
            }
          }
        } finally {
          setloaderDisplay(false);
        }
      };
  
      fetchData();
    } else {
      modifydocument(newDocument(doctype, doctypetext));
    }
  }, [props.location.search]);
  
  
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
    let redirectpath = '/Recommendations'
    return <Redirect push to={redirectpath} />;
  } else

  {
  
    let currentdocument1={...currentdocument};
    console.log ("", currentdocument )
    const values = {
      infostring: currentdocument1.rectext // rectext se infostring ko set karein
    };

    const handleAddButtonClick = async () => {
      try {
        console.log('Executing GraphQL query...');
        
        const result = await getRecommendationsObjects(values); // Assuming you have values defined somewhere
        console.log('GraphQL query successful. Result:', result);
        modifydocument(result);

        // Handle the result as needed, maybe update the state with the result
      } catch (error) {
        console.error('Error fetching data from server:', error);
        // Handle the error, maybe show a message to the user
      }
    };
    
    return (
      <>
        <Loader display={loaderDisplay} />
        <div className="container_itss">
          <div className="grid_itss">
     
            <div className="row_itss">

            <M_Textarea  wd="12" label="" name="rectext" currdoc={currentdocument1} section={'rectext'} modifydoc={modifydocument}/>      
      <button 
  onClick={handleAddButtonClick} 
  style={{ 
    backgroundColor: '#647', 
    color: 'white', 
    padding: '10px 30px', 
    border: 'none', 
    borderRadius: '5px', 
  }} 
>
Add
</button>
</div>
<div className="row_itss">
              <SearchSelectInput inpref={compinp} wd="3" label="" options={M_stocklist} name="name" currdoc={currentdocument1} section={'name'} modifydoc={modifydocument} refresh={getStockcmp} />
              <DatePicker wd="3" label="Recommendation Date" name="recodate" currdoc={currentdocument1} section={'recodate'} modifydoc={modifydocument} format="yyyymmdd" />
              <FlatInput wd="3" label="Current market price" name="cmp" currdoc={currentdocument1} section={'cmp'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Add Up To" name="addupto" currdoc={currentdocument1} section={'addupto'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Stop Loss" name="sl" currdoc={currentdocument1} section={'sl'} modifydoc={modifydocument} />
              <div className={"col_itss-6"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Weightage" name="weightage" currdoc={currentdocument1} section={'weightage'} modifydoc={modifydocument} />

              <SelectInput wd="3" label="Time Frame" options={timeframeoptions} name="timeframe" currdoc={currentdocument1} section={'timeframe'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Target 1" name="target1" currdoc={currentdocument1} section={'target1'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 2" name="target2" currdoc={currentdocument1} section={'target2'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 3" name="target3" currdoc={currentdocument1} section={'target3'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Target 4" name="target4" currdoc={currentdocument1} section={'target4'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 5" name="target5" currdoc={currentdocument1} section={'target5'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 6" name="target6" currdoc={currentdocument1} section={'target6'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Target 7" name="target7" currdoc={currentdocument1} section={'target7'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 8" name="target8" currdoc={currentdocument1} section={'target8'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Target 9" name="target9" currdoc={currentdocument1} section={'target9'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
            <div className="row_itss">
              <FlatInput wd="3" label="Comment 1" name="comment1" currdoc={currentdocument1} section={'comment1'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Comment 2" name="comment2" currdoc={currentdocument1} section={'comment2'} modifydoc={modifydocument} />
              <FlatInput wd="3" label="Comment 3" name="comment3" currdoc={currentdocument1} section={'comment3'} modifydoc={modifydocument} />
              <div className={"col_itss-3"}></div>
            </div>
 
            <div className="row_itss">
            <button onClick={()=>{handlesendRecommendationNotification(currentdocument1)}}>
                  Send Notication 
            </button>
            </div>

               <div className="row_itss">
              <OnlineFileuploadComponent
                section={'reffiles'}
                autoupload={true}       
                saveasis={() => {  }}
                currdoc={currentdocument1}
                modifydoc={modifydocument}
              />

            </div>
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
          <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
          <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
        </div>
     {/*   <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus} />*/}
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