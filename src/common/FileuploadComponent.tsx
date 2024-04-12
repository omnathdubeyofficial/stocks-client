import React, { useState } from "react";

//import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";

import {

  deleteData,
  uploadDocformIDB,
  loadDocformIDBtoObject,
  saveDatauriArrToIndexdb,
  uploadDocformIDBArr,
  saveItemGeneric,
  saveDatauriToIndexdb
} from "./CommonLogic";
import { Avatar, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  setValue,
  getValue,
  getErrorValue,
  getDtFormat,
  getDateYYYYMMDD,
  getErrorValueN,
  setCalValue,
  getTimeFormat,
  getDateYYYYMMDDHHMI,
  getFromToDate,
} from "./validationlib";
import { fileUrl, deleteUrl, uploadUrl, getfileUrl } from "../shared/baseUrl";








export const FileuploadComponent = React.memo(props => {


  const handleSubmit = (event) => {
    console.log('*******************************');
    event.preventDefault();
    
  };


  const saveFiles = (inputdata_arr) => {

    let arr_statefile = [...componentfiles];

    for (var i = 0; i < inputdata_arr.length; i++) {


      
     

      arr_statefile = saveItemGeneric({ ...inputdata_arr[i] }, arr_statefile);


     
    }
    props.files.splice(0, props.files.length);

    for (var i = 0; i < arr_statefile.length; i++) {
      let r = { ...arr_statefile[i] };
      delete r.file;
      props.files.push(r);
    }
   
    setcomponentFiles(arr_statefile);

  }





  let { autoupload, files,  saveasis } = props;
  const [componentfiles, setcomponentFiles] = useState([]);
  if (autoupload == null) autoupload = false;

  let uploadcount = 0;












  if (files == null) {
    return (<div>Loading</div>)
  }





  if (componentfiles.length != files.length) {
    loadDocformIDBtoObject(files, setcomponentFiles);
  }



  for (var j = 0; j < files.length; j++) {
    if (files[j].serverdoc != null)
      uploadcount = uploadcount + 1;
  }




  return (
    <div>
      <div className="row_itss">


        <div className="row_itss">
          <form onSubmit={handleSubmit}>
            <h3>React Multiple File Upload</h3>
            <div className="form-group">
              <input
                type="file"
                name="fileCollection"
                onChange={(event) => {
           
                  let uploadfiles = event.target.files;


              


                  if (autoupload == true) {
                    saveDatauriArrToIndexdb(uploadfiles, (arr) => {

                      uploadDocformIDBArr(arr, saveFiles);
                    });
                  } else {

                 

                    saveDatauriArrToIndexdb(uploadfiles, saveFiles);
                  }



                }}
                multiple
              />
            </div>
          </form>
        </div>

      </div>

      {
        <div>
          <div>
            {"current document  " +
              (files == null
                ? "undef"
                : files.length)}{" "}
          </div>
          <div>{"componentfiles files " + componentfiles.length}</div>
          <div>{"uploadcount " + uploadcount}</div>
        </div>
      }






      {componentfiles.map((value, index) => {
        let { serverdoc, uploaderror, deleteerror } = value;

        if (uploaderror == null) uploaderror = false;

        if (deleteerror == null) deleteerror = false;


        let isFile = false;
        let hosturl='http://localhost:7501'
        let srcPath =
          serverdoc == null
            ? URL.createObjectURL(value.file)
            : hosturl+serverdoc.fileCollection[0].filepath;

           




        if (value.file != null) {
          isFile = typeof value.file.name == "string";
        }
        return (
          <div key={value.z_id}>
            {isFile ? <Avatar src={srcPath} /> : <div />}

            <Button
              variant="contained"
              color="primary"
              style={{ margin: 10, width: 300 }}
              onClick={(e) => {
            
                if (serverdoc == null) {
                  deleteData("files", value.z_id).then(() => {

                    let recordIndex = files.findIndex(record =>
                      record.z_id == value.z_id
                    );

                    if (recordIndex > -1) {
                      files.splice(recordIndex, 1);
                    }
                    loadDocformIDBtoObject(files, setcomponentFiles);
                    saveasis();

                  });
                } else {

                  console.log('params',{
                    serverdocid: serverdoc.z_id,
                  })



                  axios
                    .post(deleteUrl, {
                      params: {
                        serverdocid: serverdoc.z_id,
                      },
                    })
                    .then((res) => {
                      deleteData("files", value.z_id).then(() => {




                        let recordIndex = files.findIndex(record =>
                          record.z_id == value.z_id
                        );

                        if (recordIndex > -1) {
                          files.splice(recordIndex, 1);
                        }
                        loadDocformIDBtoObject(files, setcomponentFiles);
                        saveasis();


                      });
                    })
                    .catch((err) => {

                      setcomponentFiles(saveItemGeneric(
                        { ...value, deleteerror: true },
                        componentfiles
                      ))


                    });
                }


                console.log(e)
                e.preventDefault();
              }}
            >
              Delete
            </Button>
            {deleteerror == true ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Delete Error — <strong>Something went wrong!</strong>
              </Alert>
            ) : null}

            {serverdoc == null ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 10, width: 300 }}
                  onClick={() => {
                    uploadDocformIDB(value.z_id, saveFiles);
                  }}
                >
                  Upload
                </Button>
                {uploaderror == true ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Upload Error — <strong>Something went wrong!</strong>
                  </Alert>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}



    </div>
  );

}

)

