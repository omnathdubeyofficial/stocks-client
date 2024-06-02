import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import constant from '../../common/constant'
import recommendationsQuery from '../../common/queries/companystatuslist'
import recommendationItems from '../../common/queries/recommendationItemsQuery'
import deleteRecommendation from '../../common/mutations/DeleteRecommendation';
import saveReccomendation from '../../common/mutations/savecompanystatus';
import sendRecommendationNotification from '../../common/mutations/sendRecommendationNotification';
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
import useSaveAction from '../../common/Hooks/useSaveAction'

export const handleSave = async (currentdocument: any) => {
    var result: any = '', errorMessage = '', errors = new Array();
    return new Promise<void>(async(resolve, reject) => {
      
    
    try {
      let recoForSave = {
        ...constant,
        z_id: nvl(currentdocument.z_id, ''), 
        companyname: nvl(currentdocument.companyname, ''),
        comment: nvl(currentdocument.comment, ''),
        status: nvl(currentdocument.status, ''),
        reviewdate: nvl(currentdocument.reviewdate, ''),
        
      }

      result = await execGql('mutation', saveReccomendation, recoForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        console.log ("%%%%%%%%%%%%%%%%%%", result.data)
        return result.data;
      }
    }
    catch (err: any) {
      const errors = err.errorsGql;
      const errorMessage = err.errorMessageGql;
      const error = { "errors": errors, "errorMessage": errorMessage };
      console.log(error);
      reject(error);
  }
  }) 
  }



  export const handlesendRecommendationNotification = async (currentdocument: object) => {
    var result: any = '', errorMessage = '', errors = new Array();
let   {applicationid ,
  client,
  lang,
  name,
  z_id} = currentdocument;

  
  let input_recommendation ={
    recommendation:{applicationid ,
      client,
      lang,
      name,
      z_id}
  }
 
    try {
      console.log('currentdocument *******',{applicationid ,
        client,
        lang,
        name,
        z_id} )
      result = await execGql('mutation', sendRecommendationNotification,  input_recommendation )
      if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      return result.data;
    }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
  }




  
  export const handleDelete = async (z_id: string) => {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('mutation', sendRecommendationNotification, { z_id })
      if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      return result.data;
    }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
  }

  export async function getRecommendations(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', recommendationsQuery, values)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        //return result.data;
        console.log("***************",result.data.companystatuslists )
        return result.data.companystatuslists;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  }

  