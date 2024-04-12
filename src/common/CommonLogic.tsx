import shortid from 'shortid'
//import {store as store1} from '../redux/configureStore';

import { getValue, getDateYYYYMMDDHHMISS } from './validationlib';

import { openDB, deleteDB, wrap, unwrap } from "idb";
import axios from "axios";

import { fileUrl,deleteUrl,uploadUrl,getfileUrl } from "../shared/baseUrl";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("files", { keyPath: "z_id" });
  },
});



export const writeData=(st, data)=> {
  // console.log('write to store')

  return dbPromise.then(function (db) {
    //  console.log(db.objectStoreNames)
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.put(data);
    //store.put(data)
    return tx.complete;
  });
}


export const readData=(st,z_id)=>{
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, "readonly");
    var store = tx.objectStore(st);
    return store.get(z_id);
  });
}


export const  uploadDocformIDB=(z_id,callback)=>
{
  readData("files",z_id).then((data) => {
 
    let data1 =data;

   var formData = new FormData();

          formData.append('files', data.file)
   


     axios.post(uploadUrl, formData, {
  }).then(res => {
   
    console.log('res.data',res.data)

      delete data1['uploaderror'];

      data1.serverdoc=res.data.fileCreated;

      callback([data1]);
      
  }).catch(err=>{
    data1.uploaderror=true;
    callback([data1]);
  })


})

}



export const saveDatauriToIndexdb = (dataUri, callback) => {
  // Do stuff with the photo...

  //var file = dataURItoBlob(dataUri);
  var file =dataUri;
  let z_id = shortid.generate();
  let data = { z_id: z_id, file: file };


  writeData("files", data)
  .then((value) => {
                      readData("files",z_id)
                      .then((value) => {
   

                        if(callback && typeof callback === "function") {
                          callback([value]);
                          }



                        
                                })
                        .catch(error=>{
                            console.log('read Data Error')
                            console.log(error)
                            });
  
    })
    .catch(error=>{
      console.log('write Data Error')
      console.log(error)
      })
    }




export const saveDatauriArrToIndexdb = (dataUriArr, callback) => {
  // Do stuff with the photo...

  //var file = dataURItoBlob(dataUri);

  let Idbdata = []



  for (var i = 0; i < dataUriArr.length; i++) {
    var file = dataUriArr[i];
    let z_id = shortid.generate();
    let data = { z_id: z_id, file: file };
    


    writeData("files", data)
      .then((value) => {
        readData("files", z_id)
          .then((value) => {

            Idbdata.push(value);

            if (Idbdata.length == dataUriArr.length) {
              if (callback && typeof callback === "function") {
                callback(Idbdata);
              }

            }





          })
          .catch(error => {
            console.log('read Data Error')
            console.log(error)
          });

      })
      .catch(error => {
        console.log('write Data Error')
        console.log(error)
      })
  }




}



export const uploadDocformIDBArr = (inputarr, callback) => {

  let temparr = [];
  for (var i = 0; i < inputarr.length; i++) {


    let z_id = inputarr[i].z_id;


  



    readData("files", z_id).then((data) => {

      let data1 = data;

      var formData = new FormData();

      formData.append('files', data.file)




      axios.post(uploadUrl, formData, {
      }).then(res => {

        


        delete data1['uploaderror'];

        data1.serverdoc = res.data.fileCreated;





        temparr.push(data1);

        if (temparr.length == inputarr.length)
          callback(temparr);

      }).catch(err => {
        data1.uploaderror = true;
        temparr.push(data1);

        if (temparr.length == inputarr.length)
          callback(temparr);

      })


    })


  }




}



export const loadDocformIDBtoObject = (arr, callback) => {



  if (arr != null) {




    let data1 = [];
    let data2 = [];
    if (arr.length == 0)
      callback([])


    arr.map((value) => {

      readData("files", value.z_id).then((data) => {




        data1.push({ ...value, file: data.file })
        //  alert('here data1 '+data1.length)
        if (arr.length == data1.length) {
          //currentdocument[section]=data1;

          callback(data1)

        }
      }).catch(
        err => { console.log(err) }
      )
    })








  }




}





export const deleteData = (st, z_id) => {
  // console.log('write to store')

  return dbPromise.then(function (db) {
    //  console.log(db.objectStoreNames)
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.delete(z_id);
    //store.put(data);
    //store.put(data)
    return tx.complete;
  });
}




export const getDocumenForSave = (document: any) => {
  let documentForSave = document;
  if (documentForSave.t_id == '' || documentForSave.z_id == null) {
    documentForSave.t_id = shortid.generate();
  }
  let datetime = getDateYYYYMMDDHHMISS(new Date());
  let date = datetime.substring(0, 8)
  let time = datetime.substring(8, 14)

  if (documentForSave.createatdate == null || documentForSave.createatdate == '') {


    documentForSave.createatdate = date;
    documentForSave.createattime = time;
  }
  else {


    documentForSave.updateatdate = date;
    documentForSave.updateattime = time;
  }
  return documentForSave;
}



export const checkItem = (text: any, arr1: any) => {
  let arr = [...arr1]
  let index = arr.findIndex((arrelement, i) => (text == arrelement));

  if (index == -1) {
    arr.push(text);
  } else {

    arr.splice(index, 1)
  }
  return arr.join()
}



export const isChecked = (text: any, arr: any) => {
  let checked = 'unchecked'
  let index = arr.findIndex((itemtext: any) => (itemtext == text))
  if (index > -1)
    checked = 'checked'
  return checked
}


export const isCheckedbool = (text: any, arr: any) => {
  let checked = false
  let index = arr.findIndex((itemtext: any) => (itemtext == text))
  if (index > -1)
    checked = true
  return checked
}



export const searchDataList = (query: any, data_list: any, field: any) => {
  if (query === '') {
    //if the query is null then return blank
    return [];
  }
  const regex = new RegExp(`${query.trim()}`, 'i');
  return data_list.filter((item: any) => {
    if (item[field] == null) item[field] = '';
    return item[field].search(regex) >= 0
  });
}


export const saveItemGeneric = (item: any, arr: any) => {
  let retarr = [];
  retarr = [...arr];

  if (item.z_id == null || item.z_id == '') {
    item.z_id = shortid.generate();
    retarr.push(item)
  }
  else {
    let index= arr.findIndex(record=>record.z_id==item.z_id);
    if(index==-1)
    {
      retarr.push(item)
    }
    else
    {
      retarr[index]=item;
    }
  }
  return retarr;

}

export const saveItemGeneric1 = (item1: any, arr: any) => {
  let retarr = [];
  let item = JSON.parse(JSON.stringify(item1))
  retarr = [...arr];

  if (item.z_id == null || item.z_id == '') {
    item.z_id = shortid.generate();
    retarr.push(item)
  }
  else {
    let index = arr.findIndex((record: any) => record.z_id == item.z_id);
    if (index == -1) {
      retarr.push(item)
    }
    else {
      retarr[index] = item;
    }
  }
  return retarr;

}


export const deleteItemGeneric = (item: any, arr: any) => {
  let retarr = [];
  retarr = [...arr];

  return retarr.filter((record) => (record.z_id != item.z_id))
}

export const filterCompanyData = (arr: any, cmpn: any) => {
  var arr_cmpn: any = [];
  arr.forEach((obj: any) => {
    if (obj.cmpn == cmpn) { arr_cmpn.push(obj) }
  }
  )

  return arr_cmpn;
}


export const getDocs = (arr: any, cmpn: any, doctype: any) => {
  var arr_cmpn: any = [];

  arr.forEach((obj: any) => {

    if (obj.cmpn == cmpn && obj.doctype == doctype && obj.doctype != 'COMPANY') {
      arr_cmpn.push(obj)
    }
    else if (obj.doctype == 'COMPANY' && doctype == 'COMPANY') {
      arr_cmpn.push(obj)
    }

  }
  )

  return arr_cmpn;
}


export const getDocNo = (currentcmpn: any, doctype: any, docnoprefix: any, docnos: any) => {

  //const state1 = store1.getState();
  //docnos1=state1.documents.docnos;

  //alert(JSON.stringify(docnos1))
  // console.log('currentcmpn-'+currentcmpn)
  // console.log('doctype-'+doctype)

  // console.log('docnoprefix-'+docnoprefix)
  // console.log('docnos-'+JSON.stringify(docnos))

  var docno = '1';
  var i;
  if (docnos != null) {
    for (i = 0; i < docnos.length; i++) {


      if (docnos[i].cmpn == currentcmpn && docnos[i].doctype == doctype && docnos[i].docnoprefix == docnoprefix) {

        docno = docnos[i].docno;
        docno = (parseInt(docno) + 1).toString();
      }

    }
  }


  return docno;

}

export const handleBlur = (name: any, currdoc: any) => {
  let currentdocument = { ...currdoc };
  let touched = { ...currentdocument.touched, [name]: true };
  currentdocument.touched = touched;
  return currentdocument;
}

export const roundoff = (amount: any, rule: any) => {
  if (rule == null || rule == '') {
    return amount
  }
  var inputamount = parseFloat(amount);
  var rulecode = rule.substring(0, 1);
  var rulevalue = parseFloat(rule.substring(1, rule.length))
  var roundamount = 0;
  var roundoff = 0
  switch (rulecode) {
    case 'N':
      roundamount = Math.round(inputamount / rulevalue) * rulevalue;
      break;
    case 'U':
      roundamount = Math.ceil(inputamount / rulevalue) * rulevalue;
      break;
    case 'D':
      roundamount = Math.floor(inputamount / rulevalue) * rulevalue;
      break;
    default:
      roundamount = inputamount;
  }
  roundoff = roundamount - inputamount;
  return roundoff
}

export const getDocconfig = (currentcmpn: any, doctype: any, docconfigs: any) => {
  let config = {};
  var i;
  if (docconfigs != null) {
    for (i = 0; i < docconfigs.length; i++) {


      if (docconfigs[i].cmpn == currentcmpn && docconfigs[i].doctype == doctype) {
        config = docconfigs[i].config;
      }

    }
  }

  return config;

}
export const getTF = (val: any) => {
  return val == 'Y' ? true : false;

}



export const reverseYN = (val: any) => {
  return val == 'Y' ? 'N' : 'Y';
}



export const getLblVal = (arr: any, label: any, value: any) => {

  if (arr == null) return []
  const objArr = arr.map((obj: any) => ({
    label: obj[label],
    value: obj[value]
  }))

  return objArr;

}


export const checkTouched = (istouched: any, message: any) => {
  if (istouched == null || message == null) {
    return ''
  }
  else {
    return istouched == true ? message : ''
  }
}




export const checkExist = (obj: any) => {
  if (obj == null) { return false; }
  else { return obj; }

}



export const nvl = (obj: any, retobj: any) => {
  if (obj == null) { return retobj; }
  else { return obj; }

}


export const comp = (a: any, b: any) => a.toLowerCase().trim() === b.toLowerCase().trim();