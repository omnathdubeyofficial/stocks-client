import {useState,useCallback} from 'react'
import { getDocumenForSave } from '../CommonLogic';
import {initDocumentstatus,newDocument} from '../constant'
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
function useSaveAction( handleSave:any,handleSaveCheck:any,doctype:String,doctypetext:String,
  resetFocus:any,deleteGraphQuery:any ) {
  const [currentdocument, modifydocument] = useState({})
  const [mainerror, setmainerror] = useState("")
  const [loaderDisplay, setloaderDisplay] = useState(false)
  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
  const [redirect, setRedirect] = useState(false)
  const doctyp= doctype
  const doctyptxt= doctypetext
  const closeSnackBar=useCallback(()=>{
    let docstatus={...documentstatus}
      docstatus.snackbaropen=false;
    setDocumentstatus(docstatus)
  },[1])
    const setDocumentAction = async (action: string) => {
        let currentDoc:any = { ...currentdocument }
        currentDoc.doctype = doctyp;
        currentDoc.doctypetext=doctyptxt;
        const { doctypetext, docnoprefix, doctype } = currentDoc;
        let action_type = '';
        let isNew = false;
        if (action == 'save_new') {
          action_type = 'save';
          isNew = true;
        }
        else {
          action_type = action
        }
        let docstatus = {...documentstatus}
        switch (action_type) {
          case 'delete':
            // Data ka check karein
           if (!currentDoc || !currentDoc.z_id) {
              // Agar data nahi hai to koi action na karein
             console.log("Data not available to delete");
           } else 
          {
              // Agar data hai to delete action ko process karein
              const docstatus = {...documentstatus}
              docstatus.action= true;
              docstatus.dailogtitle= doctypetext + ' Deletion';
              docstatus.dailogtext= 'Delete ' + doctypetext + '?'
              docstatus.yesaction= async () => {
                await handleDelete(currentDoc.z_id)
                modifydocument(newDocument(doctype,doctypetext))
                docstatus.action= false;
                docstatus.snackbaropen=true;
                docstatus.snackbarseverity='success';
                docstatus.snackbartext= doctypetext + ' Deleted'
                setDocumentstatus({...docstatus})
              }
              docstatus.noaction= () => {
                docstatus.action = false;
                setDocumentstatus({...docstatus})
              }
              setDocumentstatus(docstatus);
              resetFocus()
            }
            break;
            case 'clear':
            docstatus = {...documentstatus}
            docstatus.action= true,
            docstatus.dailogtitle= ' Clear ' + doctypetext,
            docstatus.dailogtext = 'Clear un-saved  ' + doctypetext + '?',
            docstatus.yesaction = () => {
                modifydocument(newDocument(doctype,doctypetext))
                docstatus.action= false
                docstatus.snackbaropen= true
                docstatus.snackbarseverity= 'success',
                docstatus.snackbartext= doctypetext + ' Cleared'
                setDocumentstatus(docstatus);
               
              },
              docstatus.noaction= () => {
                docstatus.action= false
                setDocumentstatus(docstatus);
              }
              setDocumentstatus(docstatus);  
              resetFocus()      
            break;
    
            case 'save':
              console.log("print currentDoc", currentDoc);
              currentDoc.validatemode = 'save';
              currentDoc = handleSaveCheck(currentDoc);
              let isSaveOk = !Object.keys(currentDoc.errorsAll).some((x: any) => currentDoc.errorsAll[x]);
              if (!isSaveOk) {
                  modifydocument({ ...currentDoc });
                  docstatus.snackbaropen = true;
                  docstatus.snackbarseverity = 'error';
                  docstatus.snackbartext = 'Errors found';
                  setloaderDisplay(false);
                  setDocumentstatus(docstatus);
              } else {
                  try {
                      if (isNew) {
                          const resp = await handleSave(currentDoc);
                          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", currentDoc);
                          setloaderDisplay(false);
                          modifydocument(newDocument(doctype, doctypetext));
                      } else {
                          let retdoc: any = await handleSave(currentDoc);
                          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", currentDoc);
                          setloaderDisplay(false);
                          modifydocument({ ...retdoc["save" + doctypetext] });
                      }
                      docstatus.snackbaropen = true;
                      docstatus.snackbarseverity = 'success';
                      docstatus.snackbartext = doctypetext + ' Saved';
                      setDocumentstatus(docstatus);
                  } catch (err: any) {
                      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", err);
          
                      // Log the full error object to understand its structure
                      console.error("Error details:", JSON.stringify(err, null, 2));
          
                      // Extract the error message
                      const errorMessage = err.errorMessage || 'An unexpected error occurred';
          
                      // Log the extracted error message
                      console.log("**********************", errorMessage);
          
                      // Update the snackbar with the extracted error message
                      docstatus.snackbaropen = true;
                      docstatus.snackbarseverity = 'error';
                      docstatus.snackbartext = errorMessage;
                      setDocumentstatus(docstatus);
                      setloaderDisplay(false);
                  }
              }
              break;
          
          
          
        }
      }
      const handleDelete = async (z_id: String) => {
        return new Promise(async (resolve, reject) => {
         var result: any = '', errorMessage = '', errors = new Array();
         try {
           result = await execGql('mutation', deleteGraphQuery, { z_id })
           if (!result) {
           console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
           reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
           // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
         } else {
           resolve(result.data)
           return result.data;
         }
         }catch (err:any) {
           errors = err.errorsGql;
           errorMessage = err.errorMessageGql;
           console.log({ "errors": errors, "errorMessage": errorMessage })
           reject({ "errors": errors, "errorMessage": errorMessage })
           // return callback({"errors":errors,"errorMessage":errorMessage},'' );
         }
        })
       
     }
      
      return [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, setRedirect,closeSnackBar,loaderDisplay, setloaderDisplay]
}

export default useSaveAction
