import * as ActionTypes from './ActionTypes';
import { baseUrl, masterDataUrl, gqlUrl } from '../../shared/baseUrl';
import { execGqlURL } from '../../common/gqlclientconfig'
import stocks from '../../common/queries/stocks';

export const addstocks = (stocks: any) => {
 
    return (
        {
            type: ActionTypes.ADD_STOCKS,
            payload: stocks
        })
};




export const fetchStocks = async (values: any, callback: any) => {
    var result = {}, errorMessage = '', errors = new Array();

    try {

        //console.log('masterdata--ok ok ok----------------------new*******');
        //  alert(JSON.stringify(masterData));

        //gqlType,gqlTypeName,gqlVariables,gqlURL
        //(gqlType,gqlTypeName,gqlVariables,gqlURL)

        result = await execGqlURL('query', stocks, {}, gqlUrl)


        //console.log(await execGqlURL('query',stocks,{},gqlUrl))
        //  console.log('masterdata--result----------------------new*******');
        // console.log(result);
        //   console.log('masterdata result end--ok ok ok--------------new******* end');
    }
    catch (err) {
        console.log('Error masterdata------------------------new*******');
        console.log(err);
        console.log('Error end masterdata------------------------new*******');
        errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
        // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    if (!result) {

        callback({ "errors": [], "errorMessage": 'No errors and results from GQL' }, '');
    }
    else {


        callback('', result.data);


    }
};









export const fetchMasters = async (values: any, callback: any) => {
    var result = '', errorMessage = '', errors = new Array();
    try {

        //console.log('masterdata--ok ok ok----------------------new*******');
        //  alert(JSON.stringify(masterData));

        //gqlType,gqlTypeName,gqlVariables,gqlURL
        //(gqlType,gqlTypeName,gqlVariables,gqlURL)

        console.log(masterDataUrl)
        let result: any = await execGqlURL('query', masterData, values, masterDataUrl)
        //  console.log('masterdata--result----------------------new*******');
        // console.log(result);
        //   console.log('masterdata result end--ok ok ok--------------new******* end');
    }
    catch (err) {
        console.log('Error masterdata------------------------new*******');
        console.log(err);
        console.log('Error end masterdata------------------------new*******');
        errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
        return callback({ "errors": errors, "errorMessage": errorMessage }, '');
    }
    if (!result) {

        return callback({ "errors": [], "errorMessage": 'No errors and results from GQL' }, '');
    }
    else {

        //console.log('step-2.2');
        //console.log(result.data);

        return callback('', result);


    }
};



export const deleteDocument = (docid: string) => ({
    type: ActionTypes.DELETE_DOCUMENT,
    payload: docid
});




export const modifydocument = (document: any) => ({

    type: ActionTypes.MODIFY_DOCUMENT,
    payload: document
});






export const saveDocument = (document: any) => ({

    type: ActionTypes.SAVE_DOCUMENT,
    payload: document
});


//users action creators

export const usersLoading = () =>
    ({
        type: ActionTypes.LOADING_USERS,
    })

export const usersFailed = (errmess: any) => ({
    type: ActionTypes.FAILED_USERS,
    payload: errmess
});

export const addusers = (users: any) => {
    console.log('----------------------')
    console.log(users)
    console.log('----------------------')
    return (




        {
            type: ActionTypes.ADD_USERS,
            payload: users
        })
};

export const setCurrentCompany = (currentcmpn:any) =>{
    alert('hi 234')
    return (
     {
    type:ActionTypes.SET_CURRENTCOMPANY,
    payload:currentcmpn
})
}
;