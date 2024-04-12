import React, { useState } from "react";
import axios from "axios";
import { fileUrl, deleteUrl, uploadUrl, getfileUrl,baseUrl } from "../shared/baseUrl";
import { Avatar, Button } from "@material-ui/core";

import {
    setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
   
  } from './validationlib';



export const OnlineFileuploadComponent = React.memo(props => {


    let {  saveasis,currdoc,modifydoc,cal,section } = props;



    console.log('currdoc',currdoc)
    console.log('section',section)

  

    let files = getValue(currdoc, section)


    if (files=='')
    {
        files=[]
    }
  
    if (files == null) {
        return (<div>Loading</div>)
    }







    return (
        <div>
            <div className="row_itss">


                <div className="row_itss">
                    <form >
                        <h3>Online Multiple File Upload</h3>
                        <div className="form-group">
                            <input
                                type="file"
                                name="fileCollection"
                                onChange={(event) => {

                                    let uploadfiles = event.target.files;
                                    let file;
                                    console.log(uploadfiles.length)


                                    for (var i = 0; i < uploadfiles.length; i++) {


                                        file = uploadfiles[i];

                                        console.log('*************file****************');
                                         console.log(file);


                                        var formData = new FormData();

                                        formData.append('files', file)



                                        axios.post(uploadUrl, formData, {
                                        }).then(res => {

                                            //   let filecreated 
                                            console.log({
                                                z_id: res.data.fileCreated.z_id,
                                                fileid: res.data.fileCreated.fileCollection[0].fileid,
                                                filepath: res.data.fileCreated.fileCollection[0].filepath,
                                                filename: res.data.fileCreated.fileCollection[0].filename,
                                                filetype: res.data.fileCreated.fileCollection[0].filetype,
                                                filesize: res.data.fileCreated.fileCollection[0].filesize
                                                
                                            })
                                            console.log('props.files', files)
                                            //    console.log(res.data.fileCreated);
                                            files.push({
                                                z_id: res.data.fileCreated.z_id,
                                                fileid: res.data.fileCreated.fileCollection[0].fileid,
                                                filepath: res.data.fileCreated.fileCollection[0].filepath,
                                                filename: res.data.fileCreated.fileCollection[0].filename,
                                                filetype: res.data.fileCreated.fileCollection[0].filetype,
                                                filesize: res.data.fileCreated.fileCollection[0].filesize
                                            })

                                            setCalValue(currdoc, section, files, modifydoc, cal)   


                                        })

                                    }
                                }}
                                multiple
                            />
                        </div>
                    </form>
                </div>

            </div>


            <div>

                <div>uploadcount {files.length}</div>
            </div>
            {
                files.map((indfile, index) => {
                    let srcPath = baseUrl + indfile.filepath;
                    return (
                        <div key={indfile.z_id}>
                            <Avatar src={srcPath} />


                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: 10, width: 300 }}
                                onClick={() => {
                                
                                    axios.post(deleteUrl, {
                                        params: {
                                            serverdocid: indfile.z_id,
                                        },
                                    })
                                    .then((res) => {

                                      let indexOfDeleted=  files.findIndex( f=> f.z_id==indfile.z_id )
                                      if (indexOfDeleted > -1) {
                                        files.splice(indexOfDeleted, 1);
                                      }

                                      setCalValue(currdoc, section, files, modifydoc, cal)  

                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        console.log('Error deletiing file')

                                    });
                                
                                }}

                            >
                                Delete
              </Button>

                        </div>
                    )


                })

            }


        </div>
    );

}

)



