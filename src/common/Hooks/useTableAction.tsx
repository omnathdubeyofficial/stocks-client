
import {useState,useEffect} from 'react'
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
import constant,{initDocumentstatus,newDocument} from '../constant';
import { useCallback } from 'react';

function useTableAction(fetchGraphQuery:any, doctype:String,deleteGraphQuery:any) {
    const [tableData, setTableData] = useState([])
    const [loaderDisplay, setloaderDisplay] = useState(true) 
    const [docno, setDocno] = useState('NO-ID')
    const [redirect, setRedirect] = useState(false)
    const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
    const values = {...constant}
    useEffect(() => {
      const interval = setInterval(() => {
        getTableData()
          .then((data: any) => {
            setTableData(data);
            setloaderDisplay(false);
          })
          .catch(error => {
            // Handle errors here
            console.error('Error fetching table data:', error);
          });
      }, 1000); // Interval set to 1000 milliseconds i.e., 1 second
    
      // Cleanup function to clear interval on component unmount
      return () => clearInterval(interval);
    }, []); // Empty dependency array means useEffect runs only once on component mount
    

   const getTableData = useCallback(() => {
        var result: any = '';
        return new Promise(async(reolve,reject)=>{
          try {       
            result = await execGql('query', fetchGraphQuery, values)
            if (!result) {
              console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
              alert("No data to display")
              reject("No data to display")
              // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
            }
            else {
              console.log(result.data[doctype+"s"])
              reolve(result.data[doctype+"s"])
            }
          }
          catch (err:any) {
            let errors = err.errorsGql;
            let errorMessage = err.errorMessageGql;
            console.log({ "errors": errors, "errorMessage": errorMessage })
            reject({ "errors": errors, "errorMessage": errorMessage })
            
          }
        })
      },[1])

     const deleteDocument = useCallback((id:String) =>{
      const docstatus = {...documentstatus}
      docstatus.action= true;
      docstatus.dailogtitle= doctype + ' Deletion';
      docstatus.dailogtext= 'Delete ' + doctype + '?'
      docstatus.yesaction= async () => {
        await handleDelete(id)
        setloaderDisplay(!loaderDisplay) 
        getTableData().then((data:any)=>{
          
               setTableData(data)
               setloaderDisplay(loaderDisplay)         
           });
          docstatus.action= false;
          docstatus.snackbaropen=true;
          docstatus.snackbarseverity='success';
          docstatus.snackbartext= doctype + ' Deleted'
          setDocumentstatus({...docstatus})
      }
      docstatus.noaction= () => {
        docstatus.action = false;
        setDocumentstatus({...docstatus})
      }
      setDocumentstatus({...docstatus});
    },[1])

     const handleDelete =useCallback( async (z_id: String) => {
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
      
    },[1])
    const closeSnackBar=useCallback(()=>{
      let docstatus={...documentstatus}
        docstatus.snackbaropen=false;
      setDocumentstatus(docstatus)
    },[1])
      return [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]
}

export default useTableAction
