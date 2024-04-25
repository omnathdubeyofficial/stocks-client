import React, { useMemo, useCallback, useState } from 'react';
import Table from '../common/table/Table';
import Column from '../common/table/Column';
import { Redirect, withRouter } from 'react-router-dom';
import fetchGQL from '../common/queries/individualnewsQuery';
import deleteGQL from '../common/mutations/deleteindividualnews';
import updateGQL from '../common/mutations/updateindividualcompany';
import useTableAction from '../common/Hooks/useTableAction';
import { useAltKey, useKey } from '../common/shortcurkeys';
import Loader from '../common/Loader/Loader';
import Messagesnackbar from '../common/Alert';
import AlertDialog from '../common/PopupModals/ConfirmationModal';
import { SelectInput } from '../common/InputFields/Select';
import DatePicker from '../common/DatePicker';
import constant from '../common/constant';


const isread = [
  { key: 'No', value: 'No' },
  { key: 'Yes', value: 'Yes' },

];



function BuyerList() {
  const fetchquery = useMemo(() => (fetchGQL), [1])
  const deletequery = useMemo(() => (deleteGQL), [1])
  const updatequery = useMemo(() => (updateGQL), [1])
  useAltKey("n", () => { setDocStatus("NO-ID", true) })
  const [currentdocument, modifydocument] = useState({});

  let querypara = useMemo(() => ({ ...currentdocument, ...constant }), [currentdocument])

  delete currentdocument?.touch

  console.log("K------------------>", querypara)
  const [tableData, loaderDisplay, docno, setDocno, redirect, setRedirect, documentstatus, deleteDocument, closeSnackBar, getTableData, setloaderDisplay, setTableData, setDocumentstatus]: any = useTableAction(fetchquery, "individualnew", deletequery, querypara)

  let tabledata: any = []
  if (tableData) {
    tabledata = useMemo(() => tableData, [loaderDisplay, currentdocument])
  }

  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id, redirect) => { setDocStatus(id, redirect) }, [1])

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;


  if (redirect) {
    const redirectpath = '/?z_id=' + docno;
    return <Redirect push to={redirectpath} />;
  } else return (
    <div className="projects">
      <div className="card_itss">

        <div className="card-body">
          <div className="card-body">
            {/* <div className='row'>
            <SelectInput wd="7" label="Is Read" name="isread" options={isread}   currdoc={currentdocument} section={'isread'} modifydoc={modifydocument} />
          </div>
          <div className='row '> 
          <DatePicker wd="4" label="Date" name="newsdate" currdoc={currentdocument} section={'newsdate'} modifydoc={modifydocument} />           
          </div>

          <button type="submit" className="btn btn-primary m-3">Submit</button>*/}
            <Table
              data={tabledata}
              defaultNoOfRows={10}
              actionColWidth={80}
              headerText="Registration Form"
              addNew={M_setDocStatus}
              onRowClick={M_setDocStatus}
              actions={[
                {
                  action: (id: String) => {
                    deleteDocument(id);
                  },
                  icon: 'fas fa-trash-alt',
                  text: 'delete',
                  className: 'table-button danger',
                },
                {
                  action: (id: any) => {
                    M_setDocStatus(id, true)
                  },
                  icon: 'fas fa-edit',
                  text: 'Edit',
                  className: 'table-button submit',
                }
              ]}
            >
              <Column fieldname="z_id" columnname=" Z ID"></Column>
              <Column fieldname="companyname" columnname="Company Name"></Column>
              <Column fieldname="companynews" columnname="Company News"></Column>
              <Column fieldname="date" columnname="Date"></Column>
              <Column fieldname="isread" columnname="Status"></Column>
              <Column fieldname="recocompany" columnname="Recocompany" render={<input />}></Column>

            </Table>
          </div>
        </div>


        <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
      </div>
    </div>
  );
}

export default BuyerList;
