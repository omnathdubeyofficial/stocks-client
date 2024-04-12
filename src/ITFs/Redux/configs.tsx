import * as ActionTypes from './ActionTypes'
import {filterCompanyData} from '../../common/CommonLogic'
import * as doctypes from './Doctypes';
import {setValue,
    getValue,
    getErrorValue,
    getDtFormat,
    getDateYYYYMMDD
} from '../../common/validationlib';

const getDefaultCompanySettings = ( ) =>{

return {
    INV001 :{



        prefixarr:new Array(),
                    
        currprefix:{
                transactiontype:'',
                prefix:''
            },
        



        cashsale:'Y',
        reversecharge:'N',
        billingname:'Y',
        docno:'Y',
        docnoprefix:'Y',
        roundoff:'Y',
        customerpodetails:'Y',
        paytermsduedate:'Y',
        ewaybillno:'Y',
        headerdiscount:'Y',
        headertax:'Y',
        supplystate:'Y',
        freequantity:'Y',
        countofbags:'N',
        taxinclusivityoption:'N',
                            transport:{
                                req:'Y',
                                fields : {
                                    fieldreq1:'Y',     
                                    fieldText1:'Transport Name.',
                                    fieldreq2:'Y', 
                                    fieldText2:'Vehicle Number.',
                                    fieldreq3:'Y', 
                                    fieldText3:'Delivery Date.',
                                    fieldreq4:'Y', 
                                    fieldText4:'Delivery Location.',
                                    fieldreq5:'Y', 
                                    fieldText5:'Field 5.',
                                    fieldreq6:'Y', 
                                    fieldText6:'Field 6.'
                                }
                                },
                            addfields:{
                                req:'Y',
                                fields : {
                                    fieldreq1:'Y', 
                                    fieldText1:'Special Instuctions.',
                                    fieldValue1:'Special Instuctions Value.',
                                    fieldprintreq1:'Y',

                                    fieldreq2:'Y', 
                                    fieldText2:'Packing Instructions.',
                                    fieldValue2:'Packing Instructions Value.',
                                    fieldprintreq2:'N',

                                    fieldreq3:'Y', 
                                    fieldText3:'Delivery Instruction.',
                                    fieldValue3:'Delivery Instruction Value.',
                                    fieldprintreq3:'N',

                                    fieldreq4:'Y', 
                                    fieldText4:'Follow Date.',
                                    fieldValue4:'dd/MM/YYYY',
                                    fieldprintreq4:'Y'
                            }
                                }         

                ,
                                addcharges:{
                                    req:'Y',
                                    fields : {

                                    fieldreq1:'Y',    
                                    fieldText1:'Shipping Charge',
                                    fieldreq2:'Y', 
                                    fieldText2:'Transport Charges.',
                                    fieldreq3:'Y', 
                                    fieldText3:'Adjustment Charges.',
                                    }
                                    }  ,  
                                    

                  



                    
             transactiondoctypes:{
                 
                
                t1:{transactiongroup:"sale",
                    transactiontext: 'Sale Invoice',
                    iconname:"file-export",
                    redirectto:'InvoiceNavigator',
                    req:'Y' },
                   
             t2:{transactiongroup:"sale",
                   transactiontext: 'Payment- In',
                   iconname:"inbox-arrow-down",
                   req:'Y'},
                   
              t3:{transactiongroup:"sale",
                   transactiontext: 'Cr.Note/Sale Return',
                   iconname:"file-undo",
                   req:'Y'},
                   
                  t4: {transactiongroup:"sale",
                   transactiontext: 'Sale Order',
                   iconname:"export-variant",
                   req:'Y'},
                   
                 t5:  {transactiongroup:"sale",
                   transactiontext: 'Estimate/ Quotation',
                   iconname:"currency-usd",
                   req:'Y'},
               
                 t6:  {transactiongroup:"sale",
                   transactiontext: 'Perfoma Invoice',
                   iconname:"file-alert-outline",
                   req:'Y'},
                   
                  t7: {transactiongroup:"sale",
                   transactiontext: 'Delivery Challan',
                   iconname:"truck-delivery",
                   req:'Y'},
                
                 t8:  {transactiongroup:"purchase",
                   transactiontext: 'Purchase Invoice',
                   iconname:"cart-arrow-down",
                   req:'Y'},
               
                 t9:  {transactiongroup:"purchase",
                   transactiontext: 'Payment - Out',
                   iconname:"inbox-arrow-up",
                   req:'Y'},
                   
                 t10:  {transactiongroup:"purchase",
                   transactiontext: 'Dr.Note/Pur-Return  ',
                   iconname:"cart-arrow-up",
                   req:'Y'},
                   
                 t11:  {transactiongroup:"purchase",
                   transactiontext: 'Purchase Order',
                   iconname:"cart-plus",
                   req:'Y'},
                
                 t12:  {transactiongroup:"other",
                   transactiontext: 'Expenses',
                   iconname:"wallet",
                   req:'Y'} ,
                
                 t13:  {transactiongroup:"other",
                   transactiontext: 'Leads',
                   iconname:"wallet",
                   redirectto:'Leadedit',
                   req:'Y'} ,
                
                 t14:  {transactiongroup:"other",
                   transactiontext: 'Users',
                   iconname:"wallet",
                   redirectto:'Useredit',
                   req:'Y'}            

            }
            
        }
            
             ,

            PARTY :{
                gstnno:'Y',
                partygroup:'Y',
                partyshippingaddr:'Y',      
                partyshippingaddrprint:'Y',
                addfields:{
                  req:'Y',
                  fields : {
                    fieldreq1:'Y', 
                    fieldText1:'Special Instuctions.',
                    fieldValue1:'Special Instuctions Value.',
                    fieldprintreq1:'Y',

                    fieldreq2:'Y', 
                    fieldText2:'Packing Instructions.',
                    fieldValue2:'Packing Instructions Value.',
                    fieldprintreq2:'Y',

                    fieldreq3:'Y', 
                    fieldText3:'Delivery Instruction.',
                    fieldValue3:'Delivery Instruction Value.',
                    fieldprintreq3:'Y',

                    fieldreq4:'Y', 
                    fieldText4:'Follow Date.',
                    fieldValue4:'dd/MM/YYYY',
                    fieldprintreq4:'Y'
              }
                  }    

            },
            ITEM :{
                    itemstock:'Y',
                    itemuom:'Y',
                    itemcategory:'Y',
                    itemdescription:'Y',
                    itemdiscount:'Y',
                    itemtax:'Y',
                    itemtype:'productservice',
                    itemqtydecimalplaces:'2',
                    addfields:
                    {
                                     req:'Y',
                                     fields : {
                                       fieldreq1:'Y', 
                                       fieldText1:'Batchno.',
                                       fieldValue1:'',
                          
                                       fieldreq2:'Y', 
                                       fieldText2:'Size.',
                                       fieldValue2:'',
                       
                                       fieldreq3:'Y', 
                                       fieldText3:'Mfg Date.',
                                       fieldValue3:'dd/MM/YYYY',
                                       
                                       fieldreq4:'Y', 
                                       fieldText4:'Mrp.',
                                       fieldValue4:'',
                          
                                       fieldreq5:'Y', 
                                       fieldText5:'Exp Date.',
                                       fieldValue5:'dd/MM/YYYY',
                       
                                       fieldreq6:'Y', 
                                       fieldText6:'Count.',
                                       fieldValue6:'',


                                       fieldreq7:'Y', 
                                       fieldText7:'Srl No.',
                                       fieldValue7:'',
                               }
                    }  
            }

}
}



export const configs = (state={
    isLoading:true,
    errMess:null,
  configs:{},
},action) =>
{
    switch(action.type)
    {

        case ActionTypes.MODIFY_SETTING:
        return {...state,errMess:null,configs:action.payload};
     



        case ActionTypes.SET_CURRENTCOMPANY:


        let configs_x=state.configs;
        let {GENERALSETTINGS} = configs_x;
        
        if(GENERALSETTINGS==null)
        {
         configs_x=setValue(state.configs,'GENERALSETTINGS', {appdateformat:'dd/mm/yyyy',appcurrencydecimalplaces:'2'})
        }

              console.log('getValue(configs_x,action.payload)')
        console.log(getValue(configs_x,action.payload))

    
       if(getValue(configs_x,action.payload)=='')
        {
        
            
         return {
                ...state,
                errMess:null,
                configs:setValue(configs_x,action.payload,getDefaultCompanySettings()),
                newconfigs:false
                }
        }
       else
        {
            return state;
        }



        default:
        return state;
    }
}
