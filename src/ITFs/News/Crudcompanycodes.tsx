import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import constant from '../../common/constant'
import recommendationsQuery from '../../common/queries/companycodeslist'
import saveReccomendation from '../../common/mutations/savecompanycode';
import sendRecommendationNotification from '../../common/mutations/sendRecommendationNotification';
import { execGql, execGql_xx } from '../../common/gqlclientconfig';

export const handleSave = async (currentdocument: any) => {
    var result: any = '', errorMessage = '', errors = new Array();
    return new Promise<void>(async(resolve, reject) => {
      
    
    try {
      let recoForSave = {
        ...constant,
        z_id: nvl(currentdocument.z_id, ''), 
        code_code: nvl(currentdocument.code_code, ''),
        code_type: nvl(currentdocument.code_type, ''),
        code_desc: nvl(currentdocument.code_desc, ''),
        code_desc1: nvl(currentdocument.code_desc1, ''),
        code_desc2: nvl(currentdocument.code_desc2, ''),

        
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
        console.log("***************",result.data.companycodeslists )
        return result.data.companycodeslists;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  }

  