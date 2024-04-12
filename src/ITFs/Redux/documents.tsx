import * as ActionTypes from './ActionTypes'
import shortid from 'shortid'
import {filterCompanyData,getDocumenForSave} from '../../common/CommonLogic'
import * as doctypes from './Doctypes'

//import { getValue,getDateYYYYMMDDHHMISS } from '../authsrc/commoncomponents/validationlib';

const updateDocno=(doc:any,arrdocnos:any)=>
{
let docnos = [...arrdocnos]
 let docnoIndex= docnos.findIndex(record=> 
 record.cmpn==doc.cmpn&&
 record.docnoprefix==doc.docnoprefix&&
 record.doctype==doc.doctype
 );
 

 if(docnoIndex==-1)
 {
 	docnos.push({cmpn:doc.cmpn,
    			 doctype:doc.doctype,
           docnoprefix:doc.docnoprefix,
                 docno:doc.docno
                 });
 }
 else {

 	if(parseFloat(doc.docno)>=parseFloat(docnos[docnoIndex].docno))
    {
  
    docnos[docnoIndex]={
    					cmpn:doc.cmpn,
                 		doctype:doc.doctype,
                 		docnoprefix:doc.docnoprefix,
                 		docno:doc.docno		
                 	   }
    }
    
    }
    
      return docnos;
	}

  const  addDoctype=(arr:any,doctype:any)=> {

    var retarr = arr.map(
      
                          (doc:any)=>{

                               let doc1 ={...doc}
                               doc1['doctype']=doctype;
                               doc1['z_id']=shortid.generate();

                               return doc1 
                              }
                          
                          
                           )

     return retarr
   }


  const setmasterdata=(documents:any,masterdata:any)=>
  {
   var docs=documents;
    console.log(docs.length)
   docs= docs.filter((document:any) => document.doctype!=doctypes.COMPANY)
   docs= docs.filter((document:any) => document.doctype!=doctypes.ITEM)
   docs= docs.filter((document:any) => document.doctype!=doctypes.PARTY)
   docs= docs.filter((document:any) => document.doctype!=doctypes.TAXGROUP)
   docs= docs.filter((document:any) => document.doctype!=doctypes.TAXTYPE)
   docs= docs.filter((document:any) => document.doctype!=doctypes.TAXRATE)
   docs= docs.filter((document:any) => document.doctype!=doctypes.GLACCOUNT)
   docs= docs.filter((document:any) => document.doctype!=doctypes.PAYMODE)
   docs= docs.filter((document:any) => document.doctype!=doctypes.PAYTERM)
   docs= docs.filter((document:any) => document.doctype!=doctypes.STATE)




   docs=  docs.concat(addDoctype(masterdata.companies,doctypes.COMPANY))
   docs=  docs.concat(addDoctype(masterdata.items,doctypes.ITEM))
   docs=  docs.concat(addDoctype(masterdata.parties,doctypes.PARTY))
   docs=  docs.concat(addDoctype(masterdata.taxgroups,doctypes.TAXGROUP))
   docs=  docs.concat(addDoctype(masterdata.taxtypes,doctypes.TAXTYPE))
   docs=  docs.concat(addDoctype(masterdata.taxrates,doctypes.TAXRATE))
   docs=  docs.concat(addDoctype(masterdata.glaccounts,doctypes.GLACCOUNT))
   docs=  docs.concat(addDoctype(masterdata.paymodes,doctypes.PAYMODE))
   docs=  docs.concat(addDoctype(masterdata.payterms,doctypes.PAYTERM))
   docs=  docs.concat(addDoctype(masterdata.states,doctypes.STATE))
   docs=  docs.concat(addDoctype(masterdata.recommendations,doctypes.RECOMMENDATION))

    return docs;
  
  
  }


  const saveDocument =(arr_documents:any,currentdocument:any)=>
  {
   



   let documents =[...arr_documents]
    
   var documentForSave=JSON.parse(JSON.stringify(currentdocument));

   if(documentForSave.z_id=='' || documentForSave.z_id==null )
   {
     documentForSave.z_id=shortid.generate();
     documents.push( documentForSave )
   }
   else
   {
     let docIndex= documents.findIndex(doc=> doc.z_id==documentForSave.z_id);
     if(docIndex==-1)
     {
       documents.push( documentForSave )
     }
     else
     {
       documents[docIndex]=documentForSave
     }
   }
 
   return documents;
  
  
  }





export const documents = (state={

    isLoading:true,
    errMess:null,
    documents:[],
    docnos:[],
    companies:[],
    parties:[],
    items:[],
    taxgroups:[],
    taxtypes:[],
    taxrates:[],
    glaccounts:[],
    paymodes:[],
    payterms:[],
    states:[],
    transactions:[],
    leads:[],
    users:[],
    recommendations:[],
    currentcmpn:'',
  },action:any) =>
{
  
    switch(action.type)
    {

   




     




        case ActionTypes.DELETE_DOCUMENT:
            switch(action.payload.doctype) {
          
          case doctypes.PARTY:
          return {...state,errMess:null,
            documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
            parties:state.parties.filter((document:any) => (document.z_id!==action.payload.z_id ))
           };
          
          break;

          case doctypes.ITEM:
           return {...state,errMess:null,
            documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
            items:state.items.filter((document:any) => (document.z_id!==action.payload.z_id ))
           };
          break;


          case doctypes.INV001:
          return {...state,errMess:null,
            documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
            transactions:state.transactions.filter((document:any) => (document.z_id!==action.payload.z_id ))
          };
            break;

            case doctypes.COMPANY:
            return {...state,errMess:null,
              documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
              companies:state.companies.filter((document:any) => (document.z_id!==action.payload.z_id ))
            };
              break;
            
          case doctypes.TAXTYPE:
          return {...state,errMess:null,
            documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
            taxtypes:state.taxtypes.filter((document:any) => (document.z_id!==action.payload.z_id ))
          };
            break;


            case doctypes.TAXRATE:
            return {...state,errMess:null,
              documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
              taxrates:state.taxrates.filter((document:any) => (document.z_id!==action.payload.z_id ))
            };
            break;



              case doctypes.TAXGROUP:
              return {...state,errMess:null,
                documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
                taxgroups:state.taxgroups.filter((document:any) => (document.z_id!==action.payload.z_id ))
              };
              break;


                case doctypes.LEAD:
                return {...state,errMess:null,
                  documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
                  leads:state.leads.filter((document:any) => (document.z_id!==action.payload.z_id ))
                };
                break;



                case doctypes.RECOMMENDATION:
                  return {...state,errMess:null,
                    documents:state.documents.filter((document:any) => (document.z_id!==action.payload.z_id )),
                    recommendations:state.recommendations.filter((document:any) => (document.z_id!==action.payload.z_id ))
                  };
                  break;


          default:
            return {...state,errMess:null,documents:state.documents,docnos:state.docnos};  
        }
        
        case ActionTypes.ADD_MASTERDOCS:

        return {
          ...state,
          errMess:null,
          documents:setmasterdata(state.documents,action.payload),
          companies:addDoctype(action.payload.companies,doctypes.COMPANY),
          states:addDoctype(action.payload.states,doctypes.STATE)
        };



        case ActionTypes.SET_CURRENTCOMPANY:

          alert('in reducer')
         return {
         
          ...state,errMess:null,
          currentcmpn:action.payload,
          parties:state.documents.filter((document:any) => document.doctype==doctypes.PARTY && document.cmpn==action.payload ),
          items:state.documents.filter((document:any) => document.doctype==doctypes.ITEM && document.cmpn==action.payload ),
          taxgroups:state.documents.filter((document:any) => document.doctype==doctypes.TAXGROUP && document.cmpn==action.payload ),
          taxtypes:state.documents.filter((document:any) => document.doctype==doctypes.TAXTYPE && document.cmpn==action.payload ),
          taxrates:state.documents.filter((document:any) => document.doctype==doctypes.TAXRATE && document.cmpn==action.payload ),
          glaccounts:state.documents.filter((document:any) => document.doctype==doctypes.GLACCOUNT && document.cmpn==action.payload ),
          paymodes:state.documents.filter((document:any) => document.doctype==doctypes.PAYMODE && document.cmpn==action.payload ),
          payterms:state.documents.filter((document:any) => document.doctype==doctypes.PAYTERM && document.cmpn==action.payload ),
          transactions:state.documents.filter((document:any) => document.doctype==doctypes.INV001 && document.cmpn==action.payload ),
          leads:state.documents.filter((document:any) => document.doctype==doctypes.LEAD && document.cmpn==action.payload ),
          recommendations:state.documents.filter((document:any) => document.doctype==doctypes.RECOMMENDATION && document.cmpn==action.payload ),
        };

        
        case ActionTypes.SAVE_DOCUMENT:
     
        let documentForSave:any=getDocumenForSave(action.payload);
        let documents:any=saveDocument(state.documents,documentForSave)
        let docnos:any=updateDocno(action.payload,state.docnos)


        switch(action.payload.doctype) {
          case doctypes.PARTY:
          let parties=saveDocument(state.parties,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,parties:parties};  
          break;

          case doctypes.ITEM:
          let items=saveDocument(state.items,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,items:items};  
          break;


          case doctypes.INV001:
          let transactions=saveDocument(state.transactions,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,transactions:transactions};  
          break;
          
          
          case doctypes.COMPANY:
          let companies=saveDocument(state.companies,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,companies:companies};  
          break;
          


          case doctypes.TAXTYPE:
          let taxtypes=saveDocument(state.taxtypes,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,taxtypes:taxtypes};  
          break;



          case doctypes.TAXRATE:
          let taxrates=saveDocument(state.taxrates,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,taxrates:taxrates};  
          break;


          
          case doctypes.TAXGROUP:
          let taxgroups=saveDocument(state.taxgroups,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,taxgroups:taxgroups};  
          break;



          case doctypes.LEAD:
          let leads=saveDocument(state.leads,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,leads:leads};  
          break;

          case doctypes.RECOMMENDATION:
          let recommendations=saveDocument(state.recommendations,documentForSave)
          return {...state,errMess:null,documents:documents,docnos:docnos,recommendations:recommendations};  
          break;



          
          default:
            return {...state,errMess:null,documents:documents,docnos:docnos};  
        }



        case ActionTypes.ADD_USERS:
        return {...state,isLoading:false,errMess:null,users:action.payload};
  




        default:
        return state;

    }
}


