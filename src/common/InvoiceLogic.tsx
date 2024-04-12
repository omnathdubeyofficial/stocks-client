import shortid from 'shortid'
import {
  runCheck,
  requiredCheck,
  getDateYYYYMMDD,
  maxLength40,
  maxLength128,
  setErrorValue
} from './validationlib';
import {roundoff,checkTouched,nvl} from './CommonLogic'
import * as doctypes from './Doctypes';
//document structure

export const newInvoiceDocument=(cmpn:any,docno:any,docnoprefix:any)=>{

  return {
    decimaldigits_config:'2',
    validatemode:'touch',
    iscash:'N',
    isreversecharge:'N',
    billingname:'',
    paymode:'',
    payrefno:'',
    z_id:shortid.generate(),
    cmpn: cmpn,
    doctype:doctypes.INV001,
    doctypetext:'Sales Invoice',
    doctypeshorttext:'Invoice',
    docnoprefix:docnoprefix,
    paystatus:'',
    paymentterms:'',
    dueon:'',
    podate:'',
    ponumber:'',
    ewaybillno:'',
    items_query:'',
    parties_query:'',
    docno:docno,
    docdate:getDateYYYYMMDD(new Date()) ,
    party:{},
    items:[],
    batches:[],
    headerdiscountamount:'0',
    headerdiscountpercent:'0',
    headertaxableamount:0,
    headertaxamount:'0',
    reversechargetaxamount:'0',
    headeritccategory:'0',
    discountfield:'amount',
    totalamount:'0',
    subtotal:'0',
    totaltax:'0',
    payableamount:'0',
    itemstotaldiscount:'0',
    totaldiscount:'0',
    headerremark:'',
    taxSupporting:[],
    taxSummary:[],
    stateofsupply:'',
    amountpaid:'0',
    balanceamount:'0',
    addcharge1:'0',
    addcharge2:'0',
    addcharge3:'0',
    roundoffamount:'0',
    roundoffreq:'Y',
    roundoffrule:'N1',

    addfields:
    {addfield1:'',
    addfield2:'',
    addfield3:'',
    addfielddate:'',
  },
    currentitem:newLineItem(),
    transportdetails:
    {
      transportname:'',
      vehiclenumber:'',
      deliverydate:'',
      deliverylocation:'',
      trptaddfield1:'',
      trptaddfield2:'',
    },
     errors:{
      save:{},
      linesave:{},
    },
    touched:{ docno: false, 
      docdate: false ,
      cmpn:false,
      party:false,
      headerdiscountamount:false,
      headerdiscountpercent:false,
      headerremark:false,

      currentitem:{
      item:false,
      uom:false,
      rate:false,
      quantity:false,
      freequantity:false,
      itemdiscountamount:false,
      itemdiscountpercent:false,
      itemremark:false,
      pricetaxinclusion:'excluded',
      batchno:false,
      srlno:false,
      mfgdate:false,
      expdate:false,
      openingqty:false,
      mrp:false
      }
    
    
    }
  }
}


export const newLineItem = () =>
{

  return {
    validatemode:'touch',
    z_id:shortid.generate(),
    item:{},
    uom:'',
    baseuom:'',
    rate:'0',
    pricetaxinclusion:'excluded',
    price:'0',
    quantity:'0',
    freequantity:'0',
    discform:'amount',
    itemdiscountamount:'0',
    itemdiscountpercent:'0',
    itemsubtotal:'0',
    itemtaxtotal:'0',
    itemitccategory:'',
    itemaddcessamount:'0',
    taxratetotal:'0',
    itemtotal:'0',
    discountfield:'amount',
    itemremark:'',
    taxrates:[],
    strtaxcodes:'',
    taxgroup:'',
    uomlist:[],
    taxcal:[],
    batch:{
      batchno:'',
      size:'',
      srlno:'',
      mfgdate:'',
      expdate:'',
      openingqty:'0',
      mrp:'0',
      desc:'',
      count:'',
    }  

  }
}

//item save check

export const handleSaveItemCheck=(currentdocument:any,docconfig:any)=>
{
  const {touched} = currentdocument ; 
  const  {item,quantity,rate,uom,itemremark,validatemode,itemdiscountpercent} = currentdocument.currentitem
 
 let item_check=runCheck(item.z_id, [requiredCheck])
 let quantity_check=runCheck(quantity, [requiredCheck,  maxLength40])
 let rate_check=runCheck(rate, [requiredCheck])
 let uom_check=runCheck(uom, [requiredCheck])
 let itemremark_check=runCheck(itemremark, [maxLength128])
 let discount_check=parseFloat(itemdiscountpercent)>100?'Discount>100%':'';

 if(currentdocument.errorsAll == null )
 {
  currentdocument.errorsAll={}
 }

if(validatemode=='save')
{
  currentdocument.errorsAll.currentitem={
    item:item_check,
    quantity:quantity_check,
    rate:rate_check,
    uom:uom_check,
    itemdiscountamount:discount_check,
    itemdiscountpercent:discount_check,
    itemremark:itemremark_check
  }
}


if(validatemode=='touch')
{
 currentdocument.errorsAll.currentitem={

      item:checkTouched(touched.currentitem.item,item_check),
      quantity: checkTouched(touched.currentitem.quantity,quantity_check),
      rate:checkTouched(touched.currentitem.rate,rate_check),
      uom:checkTouched(touched.currentitem.uom,uom_check),
      itemdiscountamount:checkTouched(touched.currentitem.itemdiscountamount,discount_check),
      itemdiscountpercent:checkTouched(touched.currentitem.itemdiscountpercent,discount_check),
      itemremark:checkTouched(touched.currentitem.itemremark,itemremark_check)
   }
}
return currentdocument;
}

//document save check
export const handleSaveCheck=(currentdocument:any,docconfig:any)=>
{
  

const {touched,cmpn,docno,docdate,headerremark,iscash,party,items,validatemode,headerdiscountpercent,discountfield,totalamount} = currentdocument ; 
let  item=''

 if(items!=null) 
 {
 if(items.length>0){ item='ok'}
 }
 

 let cmpn_check=runCheck(cmpn, [requiredCheck]);
 let docno_check=runCheck(docno, [requiredCheck,  maxLength40]);
 let docdate_check=runCheck(docdate, [requiredCheck]);
 let headerremark_check=runCheck(headerremark, [maxLength128]);
 //let party_check=iscash=='Y'?'':runCheck(party.z_id, [requiredCheck]);
 let party_check=''
 //let item_check=runCheck(item, [requiredCheck]);

 
 let totalamount_check=parseFloat(totalamount)<=0?'>0':'';


 let discount_check=parseFloat(headerdiscountpercent)>100?'Discount>100%':'';

 if(validatemode=='save')
 {


    currentdocument.errorsAll={
     cmpn:cmpn_check,
     docno:docno_check,
     docdate:docdate_check,
     headerremark:headerremark_check,
     party:party_check,
     headerdiscountpercent:discount_check,
     headerdiscountamount:discount_check,
     totalamount:totalamount_check
   }

 }
 

 if(validatemode=='touch')
 {
      currentdocument.errorsAll={
      cmpn:checkTouched(touched.cmpn,cmpn_check),
      docno:checkTouched(touched.docno,docno_check),
      docdate:checkTouched(touched.docdate,docdate_check),
      headerremark:checkTouched(touched.headerremark,headerremark_check),
      party:checkTouched(touched.party,party_check),
     // item:checkTouched(touched.currentitem.item,item_check),
      headerdiscountpercent:checkTouched(touched.headerdiscountpercent,discount_check),
      headerdiscountamount:checkTouched(touched.headerdiscountamount,discount_check)
    }
 }

return currentdocument;

}

//calculations 
export const calculateDocument =(currentDoc:any,calculateTax:any) =>
{
 const  {decimaldigits_config} = currentDoc;
 
let decimaldigits='0'
 if(decimaldigits==null || decimaldigits=='')
 {
 decimaldigits='2';
 }
 else
 {
  decimaldigits=decimaldigits_config;
 }
if(calculateTax=='currentitem')
{
  let rate=0,
  quantity=0,
  itemdiscountamount=0,
  itemdiscountpercent=0,
  itemsubtotal=0,
  itemtaxtotal=0,
  taxratetotal=0,
  itemtaxableamount=0,
  itemtotal=0,
  itemaddcessamount=0;
  let currentitem = currentDoc.currentitem;


  rate=parseFloat(nvl(currentitem.rate,'0','0'));
  quantity=parseFloat(nvl(currentitem.quantity,'0'));
  itemdiscountamount=parseFloat(nvl(currentitem.itemdiscountamount,'0'));
  itemdiscountpercent=parseFloat(nvl(currentitem.itemdiscountpercent,'0'));
  itemaddcessamount=parseFloat(nvl(currentitem.itemaddcessamount,'0'));
 

  
  
  itemsubtotal=quantity*rate;
   
  if(currentitem.discountfield=='amount') 
  {
    currentDoc.currentitem.itemdiscountpercent=(itemdiscountamount/itemsubtotal*100).toString()
  }
  if(currentitem.discountfield=='percent') 
  {
    currentDoc.currentitem.itemdiscountamount=(itemdiscountpercent*itemsubtotal/100).toString()+'';
  }


  if(currentDoc.currentitem.taxrates!=null)
{
let itemtaxamount=0;
  for (var i = 0; i < currentDoc.currentitem.taxrates.length; i++) 
  {
     taxratetotal=taxratetotal+parseFloat(nvl(currentDoc.currentitem.taxrates[i].rate,'0'));
   }

}



  if(currentDoc.currentitem.pricetaxinclusion=='included')
  {
    itemsubtotal=itemsubtotal/(1+(taxratetotal/100));
  }

  itemtaxableamount=itemsubtotal-itemdiscountamount;
  itemtaxtotal=itemtaxableamount*taxratetotal/100;
 
  itemtotal=itemtaxableamount+itemtaxtotal+itemaddcessamount;



  if(currentDoc.currentitem.taxrates!=null)
  {
    for (var i = 0; i < currentDoc.currentitem.taxrates.length; i++) 
    {
      let taxamount=itemtaxableamount*parseFloat(nvl(currentDoc.currentitem.taxrates[i].rate,'0'))/100;
      currentDoc.currentitem.taxrates[i].taxamount=taxamount.toString();
     }
  
  }


  currentDoc.currentitem.taxratetotal=taxratetotal.toString();
  currentDoc.currentitem.itemtaxtotal=itemtaxtotal.toString();
  currentDoc.currentitem.itemsubtotal=itemsubtotal.toString();
  currentDoc.currentitem.itemtaxableamount=itemtaxableamount.toString();
  currentDoc.currentitem.itemtotal=itemtotal.toString();

  return currentDoc;

}
else
{
  let totalamount=0,
  subtotal=0,
  totaltax=0,
  itemstotaldiscount=0,
  balanceamount=0,
  headerdiscountamount=0,
  reversechargetaxamount=0,
  payableamount=0,
  hdrDiscountPercent:any=0;


  for (var i = 0; i < currentDoc.items.length; i++) 
  {
    subtotal=parseFloat(nvl(currentDoc.items[i].itemtotal,'0'))+subtotal;
    totaltax=parseFloat(nvl(currentDoc.items[i].itemtaxtotal,'0'))+totaltax;
    itemstotaldiscount=parseFloat(nvl(currentDoc.items[i].itemdiscountamount,'0'))+itemstotaldiscount;
  }


 if(currentDoc.discountfield=='amount') 
  {
     hdrDiscountPercent=(parseFloat(nvl(currentDoc.headerdiscountamount,'0'))/subtotal*100).toString()

     if(hdrDiscountPercent=='NaN'){hdrDiscountPercent=0}
     currentDoc.headerdiscountpercent=parseFloat(hdrDiscountPercent).toString();
  }
  
  if(currentDoc.discountfield=='percent') 
  {
    currentDoc.headerdiscountamount=(subtotal*nvl(currentDoc.headerdiscountpercent,'0')/100).toString()+''
  }

  let headertaxamount=0;
  let headertaxableamount=0;
  headerdiscountamount=parseFloat(nvl(currentDoc.headerdiscountamount,'0'));
  headertaxableamount=subtotal-headerdiscountamount;

if(currentDoc.taxrates!=null)
{

  for (var i = 0; i < currentDoc.taxrates.length; i++) 
  {
    let indTax=parseFloat(nvl(currentDoc.taxrates[i].rate,'0'))*headertaxableamount/100;
    headertaxamount=headertaxamount+ indTax;
    currentDoc.taxrates[i].taxamount=indTax.toString();
    
  }

}

totaltax=totaltax+headertaxamount;


currentDoc.headertaxamount=headertaxamount.toString();
currentDoc.headertaxableamount=headertaxableamount.toString();
 

  // totalamount=parseFloat(currentDoc.items[i].itemtotal)+totalamount;

  let addcharge1=parseFloat(currentDoc.addcharge1);
	let addcharge2=parseFloat(currentDoc.addcharge2);
  let addcharge3=parseFloat(currentDoc.addcharge3);
 
    totalamount=subtotal+headertaxamount+addcharge1+addcharge2+addcharge3-headerdiscountamount;
let roundoffamount=0;
    if(currentDoc.roundoffreq=='Y')
{
roundoffamount=roundoff(totalamount, currentDoc.roundoffrule);

}
else
{
  roundoffamount=0;
}

totalamount=totalamount+roundoffamount;



if(currentDoc.items.length==0)
{
totalamount=parseFloat(currentDoc.totalamount)
}


    if(currentDoc.isreversecharge=='Y')
{
  reversechargetaxamount=totaltax;
  payableamount=totalamount-reversechargetaxamount;
}
else
{
  reversechargetaxamount=0;
  payableamount=totalamount;
}


    let amountpaid=currentDoc.iscash=='Y'?totalamount:parseFloat(currentDoc.amountpaid);
   
    currentDoc.amountpaid=amountpaid.toString();

    
    balanceamount=payableamount-amountpaid;
   
    if(balanceamount==0 || currentDoc.iscash=='Y')
    {
      currentDoc.paystatus='paid'
    }
    else if(balanceamount>0 && balanceamount<payableamount)
    {
      currentDoc.paystatus='partial'
    }
    else
    {
      currentDoc.paystatus='unpaid'
    }  

    currentDoc.roundoffamount=roundoffamount.toString();
  
    currentDoc.totalamount=totalamount.toString();
    
    currentDoc.subtotal=subtotal.toString();
    currentDoc.totaltax=totaltax.toString();
    currentDoc.payableamount=payableamount.toString();
    currentDoc.reversechargetaxamount=reversechargetaxamount.toString();
    currentDoc.itemstotaldiscount=itemstotaldiscount.toString();
    currentDoc.balanceamount=balanceamount.toString();

return currentDoc;
}
}

// delete item
export const deleteItem=(id:any,curdoc:any)=>{
 let currentdocument=JSON.parse(JSON.stringify(curdoc))
  let itemIndex= currentdocument.items.findIndex((item:any)=> item.z_id==id);
  currentdocument.items.splice(itemIndex,1);
  newItem(currentdocument);
  return calculateDocument(currentdocument,'saveitem');
}
export const newItem=(currentdocument:any)=>
{
   Object.assign(currentdocument.currentitem,newLineItem())

return currentdocument
}

// save item
export const saveItem=(curdoc:any)=>{

  let currentdocument=JSON.parse(JSON.stringify(curdoc))
  let currentitem={...currentdocument.currentitem}
  if(Object.keys(currentitem.item).length!=0)
  {  
    let itemIndex= currentdocument.items.findIndex((item:any)=> item.z_id==currentitem.z_id);
    if(itemIndex==-1)
    {
      currentdocument.items.push(currentitem);
    }
    else
    {
      currentdocument.items[itemIndex]=currentitem;
    }
    
    currentdocument.items_query=''

     newItem(currentdocument);
    } 
   
  return calculateDocument(currentdocument,'saveitem'); 

}



// export const  searchDataList = (query,data_list,field) =>
// {


//   //alert(query + field + JSON.stringify(data_list) )
//   if (query === '') {
//     //if the query is null then return blank
//     return [];
//   }
//   const regex = new RegExp(`${query.trim()}`, 'i');


//  return data_list.filter(item => item[field].search(regex) >= 0 );
// }





export const  searchDataList = (query:any,data_list:any,field:any) =>
{
  if (query === '') {
    //if the query is null then return blank
    return [];
  }
  const regex = new RegExp(`${query.trim()}`, 'i');
  return data_list.filter((item:any) => {  if(item[field]==null)item[field]='';    
                                     return item[field].search(regex) >= 0 }) ;
}



export const getUomConversion=(baseuom:any,seluom:any,auom:any)=>
{
var inm= auom.split(',')
var uomList=[];
var conversion='1';
uomList.push({uom:baseuom,conversion:'1'});
for (var i=0; i<inm.length; i++) 
{
var inm1=inm[i].split(':');
uomList.push(
{uom:inm1[0],conversion:inm1[1]}
)
}
for (var k=0; k<uomList.length; k++) 
{
if(uomList[k].uom==seluom)
conversion= uomList[k].conversion
}

return conversion;
}



export const  getUOMList=(uom:any,auom:any)=>
{
var inm= auom.split(',')
var uomList=[];
uomList.push(uom);
for (var i=0; i<inm.length; i++) 
{
var inm1=inm[i].split(':');
uomList.push(inm1[0])
}
return uomList
}
export const fetchTax= (cmpn:any,taxgroupsel:any,taxgroups:any,taxrates:any) => {


  let taxgroupIndex= taxgroups.findIndex((taxgroup:any)=> taxgroup.taxgroup==taxgroupsel);
  let taxrates1=[];

  if(taxgroupIndex!=-1)
  {
  let taxgroup=taxgroups[taxgroupIndex]
  let taxes=taxgroup.taxes.split(',')

  for(var i=0;i<taxes.length;i++)
  {

    for(var j=0;j<taxrates.length;j++)
    {
      if(taxrates[j].tax==taxes[i]  && taxrates[j].cmpn==cmpn )
      taxrates1.push(taxrates[j])
    }
  }
}
 
  return taxrates1;
  
  }


// export const saveBatch=(curdoc)=>{

//   let currentdocument=JSON.parse(JSON.stringify(curdoc))
//   let currentitem={...currentdocument.currentitem}
//   const {z_id,batchno,srlno, mfgdate, expdate,openingqty,mrp} = currentitem.batch;
//   const itemid=currentitem.z_id;
//   let total_batchqty=0;
//   currentdocument.batches.forEach(function(batch)
//   {
//     if(batch.itemid==itemid && batch.z_id!=z_id ) 
//     {
//       total_batchqty=parseFloat(batch.openingqty)+parseFloat(total_batchqty)
//     }
//   }
// );

//   total_batchqty=total_batchqty+parseFloat(openingqty)

//   if(total_batchqty<=parseFloat(currentitem.item_quantity))
//   {
//     let itemIndex= currentdocument.batches.findIndex(batch=> batch.z_id==z_id);
//     if(itemIndex==-1)
//     {
//       currentdocument.batches.push({z_id,itemid,batchno,srlno, mfgdate, expdate,openingqty,mrp});
//      }
//      else
//      {
//       currentdocument.batches[itemIndex]={z_id,itemid,batchno,srlno, mfgdate, expdate,openingqty,mrp};
//      }

//   }
//   else
//   {
//     alert('Batch Quantity more than Line Item quantity');
//   }

   
//   return currentdocument; 

// }



// export const newBatch = () =>
// {
//   return {
//    validatemode:'touch',
//    z_id:shortid.generate(),
//    itemid:'', 
//    batchno:'',
//    srlno:'',
//    mfgdate:'',
//    expdate:'',
//    openingqty:'0',
//    mrp:'0'

//   }
// }



