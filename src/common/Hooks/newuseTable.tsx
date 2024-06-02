import { useState, useEffect, useCallback } from 'react';
import { execGql } from '../../common/gqlclientconfig';
import constant, { initDocumentstatus } from '../constant';

function useTableAction(fetchGraphQuery, doctype, deleteGraphQuery) {
  const [tableData, setTableData] = useState([]);
  const [loaderDisplay, setLoaderDisplay] = useState(true);
  const [docno, setDocno] = useState('NO-ID');
  const [redirect, setRedirect] = useState(false);
  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus);
  const values = { ...constant };

  const getTableData = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await execGql('query', fetchGraphQuery, values);
        if (!result) {
          console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' });
          alert("No data to display");
          reject("No data to display");
        } else {
          console.log(result.data[doctype + "s"]);
          resolve(result.data[doctype + "s"]);
        }
      } catch (err) {
        const errors = err.errorsGql;
        const errorMessage = err.errorMessageGql;
        console.log({ "errors": errors, "errorMessage": errorMessage });
        reject({ "errors": errors, "errorMessage": errorMessage });
      }
    });
  }, [fetchGraphQuery, values, doctype]);

  useEffect(() => {
    const handleActivity = () => {
      getTableData()
        .then((data) => {
          setTableData(data);
          setLoaderDisplay(false);
        })
        .catch(error => {
          console.error('Error fetching table data:', error);
        });
    };

    // List of events to listen for user activity
    const events = ['click', 'keydown', 'mousemove', 'scroll'];

    // Add event listeners for each event
    events.forEach(event => document.addEventListener(event, handleActivity));

    // Cleanup function to remove event listeners on component unmount
    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
    };
  }, [getTableData]);

  const deleteDocument = useCallback((id) => {
    const docstatus = { ...documentstatus };
    docstatus.action = true;
    docstatus.dailogtitle = `${doctype} Deletion`;
    docstatus.dailogtext = `Delete ${doctype}?`;
    docstatus.yesaction = async () => {
      await handleDelete(id);
      setLoaderDisplay(!loaderDisplay);
      getTableData().then((data) => {
        setTableData(data);
        setLoaderDisplay(loaderDisplay);
      });
      docstatus.action = false;
      docstatus.snackbaropen = true;
      docstatus.snackbarseverity = 'success';
      docstatus.snackbartext = `${doctype} Deleted`;
      setDocumentstatus({ ...docstatus });
    };
    docstatus.noaction = () => {
      docstatus.action = false;
      setDocumentstatus({ ...docstatus });
    };
    setDocumentstatus({ ...docstatus });
  }, [doctype, documentstatus, handleDelete, loaderDisplay, getTableData]);

  const handleDelete = useCallback(async (z_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await execGql('mutation', deleteGraphQuery, { z_id });
        if (!result) {
          console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' });
          reject({ "errors": [], "errorMessage": 'No errors and results from GQL' });
        } else {
          resolve(result.data);
          return result.data;
        }
      } catch (err) {
        const errors = err.errorsGql;
        const errorMessage = err.errorMessageGql;
        console.log({ "errors": errors, "errorMessage": errorMessage });
        reject({ "errors": errors, "errorMessage": errorMessage });
      }
    });
  }, [deleteGraphQuery]);

  const closeSnackBar = useCallback(() => {
    let docstatus = { ...documentstatus };
    docstatus.snackbaropen = false;
    setDocumentstatus(docstatus);
  }, [documentstatus]);

  return [tableData, loaderDisplay, docno, setDocno, redirect, setRedirect, documentstatus, deleteDocument, closeSnackBar];
}

export default useTableAction;
