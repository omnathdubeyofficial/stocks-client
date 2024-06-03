import React, { useMemo, useCallback, useState } from 'react';
import Table from '../../common/table/Table';
import Column from '../../common/table/Column';
import { Redirect, withRouter } from 'react-router-dom';
import fetchGQL from '../../common/queries/companycodeslist';
import deleteGQL from '../../common/mutations/deletecompanycodes';
import useTableAction from '../../common/Hooks/useLiveUpdate';
import { useAltKey, useKey } from '../../common/shortcurkeys';
import Loader from '../../common/Loader/Loader';
import Messagesnackbar from '../../common/Alert';
import AlertDialog from '../../common/PopupModals/ConfirmationModal';
import Companycodes from './companycodes'; // Import your form component

function RecommendationList() {
  const fetchquery = useMemo(() => fetchGQL, []);
  const deletequery = useMemo(() => deleteGQL, []);
  const [tableData, loaderDisplay, docno, setDocno, redirect, setRedirect, documentstatus, deleteDocument, closeSnackBar]: any = useTableAction(fetchquery, "companycodeslist", deletequery);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  let tabledata: any = useMemo(() => tableData, [tableData]);

  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id);
    setRedirect(redirect);
    setShowForm(true); // Open the form when a row is clicked
  }

  const M_setDocStatus = useCallback((id, redirect) => { setDocStatus(id, redirect) }, [1]);
  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  useAltKey("n", () => { setDocStatus("NO-ID", true) });

  if (redirect) {
    let redirectpath = '/Companycodes?z_id=' + docno;
    return <Redirect push to={redirectpath} />
  } else return (
    <div className="card_itss">
      <div className="card-body">
        {showForm && <Companycodes />} {/* Render the form when showForm is true */}
        <Table
          data={tabledata}
          defaultNoOfRows={10}
          actionColWidth={80}
          headerText="Code List"
          addNew={M_setDocStatus}
          onRowClick={M_setDocStatus}
          actions={[
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
          <Column fieldname="code_code" columnname="Code"></Column>
          <Column fieldname="code_type" columnname="Code Tpye"></Column>
          <Column fieldname="code_desc" columnname="Description1"></Column>
          <Column fieldname="code_desc1" columnname="Description2"></Column>
          <Column fieldname="code_desc2" columnname="Description3"></Column>

        </Table>
      </div>
      <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
      <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
    </div>
  );
}

export default RecommendationList;
