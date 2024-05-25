import React, { useMemo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Table from '../../common/table/Table';
import Column from '../../common/table/Column';
import fetchGQL from '../../common/queries/individualnewsQuery';
import deleteGQL from '../../common/mutations/deleteindividualnews';
import updateGQL from '../../common/mutations/saveReccomendation';
import useTableAction from '../../common/Hooks/useTableAction';
import { useAltKey } from '../../common/shortcurkeys';
import Messagesnackbar from '../../common/Alert';
import AlertDialog from '../../common/PopupModals/ConfirmationModal';
import { SelectInput } from '../../common/InputFields/Select';
import DatePicker from '../../common/DatePicker';
import constant from '../../common/constant';
import { SearchSelectInput } from '../../common/InputFields/SearchSelect';
import { fetchStocks, addstocks } from '../../ITFs/Redux/ActionCreators';


function Individualnewslist(props) {
  const [stocklist, setstocklist] = useState([]);
  const fetchquery = useMemo(() => fetchGQL, []);
  const deletequery = useMemo(() => deleteGQL, []);
  const updatequery = useMemo(() => updateGQL, []);
  useAltKey("n", () => { setDocStatus("NO-ID", true) });
  const [currentdocument, modifydocument] = useState({});

  let querypara = useMemo(() => ({ ...currentdocument, ...constant }), [currentdocument]);

  delete currentdocument?.touch;

  console.log("K------------------>", querypara);
  const [
    tableData, loaderDisplay, docno, setDocno, redirect, setRedirect, documentstatus, deleteDocument, 
    closeSnackBar, getTableData, setloaderDisplay, setTableData, setDocumentstatus
  ] = useTableAction(fetchquery, "individualnew", deletequery,  querypara);


  let tabledata: any = []
  if (tableData) {
    tabledata = useMemo(() => tableData, [loaderDisplay, currentdocument])
  }

    const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id, redirect) => { setDocStatus(id, redirect) }, []);

  const getStockcmp = () => {
    fetchStocks({}, (err, result) => {
      if (err === '') {
        console.log(result);
        props.addstocks(result);
      } else {
        console.log(err, result);
      }
    });
  }

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  if (stocklist && props ?.stocks && stocklist ?.length !== props ?.stocks ?.length) {
    setstocklist(props.stocks.map((el: any) => { return { value: el.name, label: el.name } }));
  }
  const M_stocklist = useMemo(() => stocklist, [stocklist]);

   if (redirect) {
    const redirectpath = 'recommendationedit/?z_id=' + docno;
    return <Redirect push to={redirectpath} />;
 } else 
  
 return (
    <div className="projects">
      <div className="card_itss">
        <div className="card-body">
          <div className="card-body">
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
              {/* <Column fieldname="z_id" columnname="z_id"></Column>*/}
              <Column fieldname="companyname" columnname="Company Name"></Column>
              <Column fieldname="companynews" columnname="Company News"></Column>
              <Column fieldname="date" columnname="Date"></Column>
              <Column fieldname="isread" columnname="Status"></Column>
              <Column fieldname="recocompany" columnname="Recocompany"></Column>

              <Column
  columnname="Recocompany"
  render={
    <div onClick={(e) => e.stopPropagation()}>
      <SearchSelectInput
        options={M_stocklist}
        name="recocompany"
        section={'recocompany'}
        refresh={getStockcmp}
        currdoc={currentdocument}
        modifydoc={modifydocument}
      />
    </div>
  }
/>
            </Table>
          </div>
        </div>
        <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
      </div>
    </div>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(Individualnewslist);
