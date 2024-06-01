import React, { useMemo, useCallback, useState } from 'react';
import Table from '../../common/table/Table';
import Column from '../../common/table/Column';
import { Redirect, withRouter } from 'react-router-dom';
import fetchGQL from '../../common/queries/companystatuslist';
import deleteGQL from '../../common/mutations/deletecompanystatus';
import useTableAction from '../../common/Hooks/useTableAction';
import { useAltKey, useKey } from '../../common/shortcurkeys';
import Loader from '../../common/Loader/Loader';
import Messagesnackbar from '../../common/Alert';
import AlertDialog from '../../common/PopupModals/ConfirmationModal';
import Companystatus from './companystatus'; // Import your form component

function RecommendationList() {
  const fetchquery = useMemo(() => fetchGQL, []);
  const deletequery = useMemo(() => deleteGQL, []);
  const [tableData, loaderDisplay, docno, setDocno, redirect, setRedirect, documentstatus, deleteDocument, closeSnackBar]: any = useTableAction(fetchquery, "companystatuslist", deletequery);
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
    let redirectpath = '/Companystatus?z_id=' + docno;
    return <Redirect push to={redirectpath} />
  } else return (
    <div className="card_itss">
      <div className="card-body">
        {showForm && <Companystatus />} {/* Render the form when showForm is true */}
        <Table
          data={tabledata}
          defaultNoOfRows={10}
          actionColWidth={80}
          headerText="User List"
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
          <Column fieldname="companyname" columnname="Company Name"></Column>
          <Column fieldname="status" columnname="Status"></Column>
          <Column fieldname="reviewdate" columnname="Review Date "></Column>
          <Column fieldname="comment" columnname="Comment"></Column>
        </Table>
      </div>
      <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
      <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
    </div>
  );
}

export default RecommendationList;
