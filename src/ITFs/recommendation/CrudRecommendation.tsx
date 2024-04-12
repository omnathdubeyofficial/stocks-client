import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../common/CommonLogic';
import constant from '../../common/constant'
import recommendationsQuery from '../../common/queries/recommendationQuery'
import recommendationItems from '../../common/queries/recommendationItemsQuery'
import deleteRecommendation from '../../common/mutations/DeleteRecommendation';
import saveReccomendation from '../../common/mutations/saveReccomendation';
import sendRecommendationNotification from '../../common/mutations/sendRecommendationNotification';
import { execGql, execGql_xx } from '../../common/gqlclientconfig';

export const handleSave = async (currentdocument: any) => {
    var result: any = '', errorMessage = '', errors = new Array();
    return new Promise<void>(async(resolve, reject) => {
      
    
    try {
      let recoForSave = {
        ...constant,
        name: nvl(currentdocument.name, ''),
        recodate: nvl(currentdocument.recodate, ''),
        cmp: nvl(currentdocument.cmp, ''),
        addupto: nvl(currentdocument.addupto, ''),
        sl: nvl(currentdocument.sl, ''),
        target1: nvl(currentdocument.target1, ''),
        target2: nvl(currentdocument.target2, ''),
        target3: nvl(currentdocument.target3, ''),
        target4: nvl(currentdocument.target4, ''),
        target5: nvl(currentdocument.target5, ''),
        target6: nvl(currentdocument.target6, ''),
        target7: nvl(currentdocument.target7, ''),
        target8: nvl(currentdocument.target8, ''),
        target9: nvl(currentdocument.target9, ''),
        
        weightage: nvl(currentdocument.weightage, ''),
        timeframe: nvl(currentdocument.timeframe, ''),
        z_id:nvl(currentdocument.z_id, ''),
        t_id:nvl(currentdocument.t_id, ''),
       reffiles:nvl(currentdocument.reffiles,[])
      }

      recoForSave.reffiles.forEach(element => {delete element.__typename});


      result = await execGql('mutation', saveReccomendation, recoForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        return result.data;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
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
        return result.data.recommendations;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  }

  