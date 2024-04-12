import React, { useMemo, useEffect, useState,useRef } from 'react'
import { connect } from 'react-redux'
import AddFabButton from '../common/InputFields/AddFabButton'
import Table from '../common/table/Table'
import Column from '../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import {addusers} from '../ITFs/Redux/ActionCreators'
import { getUsers1 } from '../ITFs/Redux/reducers/actions'
import {useAltKey,useKey} from '../common/shortcurkeys'
export const UserListComponent = (props: any) => {

  const [docno, setDocno] = useState('NO-ID')
  const [redirect, setRedirect] = useState(false)
  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }
  const goback = () => {
    setDocno('')
    setRedirect(redirect)
  }

  useEffect(() => {
    getUsers1({applicationid:'15001500',client:'45004500',lang: 'EN'}).then((users:any)=>{
      if(props){
      props.addusers(users)
    }
    });
    return () => {
      
    }
  }, [])
  let tabledata:any = []
  if(props.users){
    tabledata =useMemo(() => [...props.users], [props.users])
}
useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = '/useredit?z_id=' + docno
    return <Redirect push to={redirectpath} />
  } else
    return (
      <div className="projects">
        <div className="card_itss">
          <div className="card-body">
            
              <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                addNew={setDocStatus}
                onRowClick={setDocStatus}
                
                actions={[
                  // {
                  //   action: (id: any) => {
                  //     setDocStatus(id, true)
                  //   },
                  //   icon: 'fas fa-edit',
                  //   text: 'Edit',
                  //   className: 'table-button submit',
                  // },
                  {
                    action: (id: any) => {
                      alert(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  }
                ]}
              >
                <Column
                  fieldname="firstname"
                  columnname="First Name"
                ></Column>

                <Column fieldname="lastname" columnname="Last Name"></Column>
                <Column fieldname="username" columnname="User Name"></Column>
                <Column fieldname="email" columnname="Email Id"></Column>
                <Column fieldname="mobile" columnname="Phone No."></Column>
              </Table>
            
          </div>
        </div>
        <AddFabButton action={setDocStatus} />
      </div>
    )
}

const mapStateToProps = (state: any) => ({
  users: state.documents.users,
  docnos: state.documents.docnos,
  companies: state.documents.companies,
})

const mapdispatcherToProp=(dispatch:any)=>{
  return {
    addusers :(users:any)=> dispatch(addusers(users))
  }
}
export default withRouter(
  connect(mapStateToProps,mapdispatcherToProp)(UserListComponent)
)
