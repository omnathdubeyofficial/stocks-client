import React from 'react'
//import { View ,Text,StyleSheet} from "react-native"
import { calculateDocument }  from './InvoiceLogic'

export  const setCalValue = (currdoc:any,section:any,value:any,modifydoc:any,cal:any) =>
{
  //alert(value)
  let currdoc1=setValue(currdoc,section,value);
  //console.log(currdoc1)
  if(cal==null || cal=='')
  {
      modifydoc(currdoc1)
      console.log(currdoc1)
  }
  else if (cal=='req')
  {
      modifydoc(calculateDocument(currdoc1,''))
  }
  else if (cal=='currentitem') {
      modifydoc( calculateDocument(currdoc1,'currentitem'))
 }
}


export const  setValue= (currentDoc1:any,section:string,value:boolean) =>
{
    var currentDoc = JSON.parse(JSON.stringify(currentDoc1));
    var currentObjref = currentDoc;
    var sections = section.split(".");
     for (var i = 0; i < sections.length; i++)
          {
            if(i==sections.length-1)
             {
               currentObjref[sections[i]]=value
             }
             else
            {
    
                if (currentObjref[sections[i]]==null )
                {
                    currentObjref[sections[i]]={};
                    currentObjref=currentObjref[sections[i]];
                }
                else
                {
                   currentObjref=currentObjref[sections[i]];
                }
             }
       }
       
    return currentDoc;
    


}



export const  setErrorValue= (currentDoc1:any,section:string,value:string) =>
{

    if(value==null || value=='')
    return currentDoc1;

    
    var currentDoc = JSON.parse(JSON.stringify(currentDoc1));
    var currentObjref = currentDoc;
    var errorSection='errorsAll'+section;

    var sections = errorSection.split(".");
     for (var i = 0; i < sections.length; i++)
          {
            if(i==sections.length-1)
             {
               currentObjref[sections[i]]=value
             }
             else
            {
    
                if (currentObjref[sections[i]]==null )
                {
                    currentObjref[sections[i]]={};
                    currentObjref=currentObjref[sections[i]];
                }
                else
                {
                   currentObjref=currentObjref[sections[i]];
                }
             }
       }
       
    return currentDoc;
    


}





export const  getValue= (currentDoc:any,section:string) =>
{
  if(currentDoc === undefined || currentDoc === null){
    return
  }
    if(section == null) return '';
    var sections = section.split(".");
   for (var i = 0; i < sections.length; i++)
  {


      
        if (currentDoc[sections[i]]==null || currentDoc[sections[i]]=='' )
            {


                return ''
                }
                else
                {
                if(i==sections.length-1)
                {
                  //alert(currentDoc[sections[i]])
                  return currentDoc[sections[i]]
                }
                else
                    {
                      
                  currentDoc=currentDoc[sections[i]]
                
                }
                }
}


}


export const  getErrorValue= (currentDoc:any,section:string) =>
{
  if(currentDoc === undefined || currentDoc === null){
    return
  }
    if(section == null) return ;
    var sections = section.split(".");
   for (var i = 0; i < sections.length; i++)
  {
        if (currentDoc[sections[i]]==null || currentDoc[sections[i]]=='')
            {
                return ;
                }
                else
                {
                if(i==sections.length-1)
                {
                return(

                  <div className="ui large red message "  style={{padding:0 ,textAlign:"left", marginTop:"0" , border: 0,backgroundColor:"transparent",boxShadow:"0 0 0 0px #db2828 inset, 0 0 0 0 transparent" }}>{ currentDoc[sections[i]] }</div>
                   
                )
                }
                else
                    {
                  currentDoc=currentDoc[sections[i]]
                }
                }
}


}


export const  getErrorValueN= (currentDoc:any,section:string) =>
{
  if(currentDoc === undefined || currentDoc === null){
    return
  }
  if(section == null ) 
  return ;
  var sections = section.split(".");
 for (let i = 0; i < sections.length; i++)
{
      if (currentDoc[sections[i]]==null || currentDoc[sections[i]]=='')
          {
              return  '';
              }
              else
              {
              if(i==sections.length-1)
              {
              return(
                  currentDoc[sections[i]] 
              )
              }
              else
                  {
                currentDoc=currentDoc[sections[i]]
              }
              }
}


}



export const requiredCheck = (value:any) => (value ? undefined : 'Required');
export const maxLength = (max:any) => (value:any) =>
  value && value.length > max ? `Must be ${max} characters or less` : ''
export const minLength = (min:any) => (value:any) =>
  value && value.length < min ? `Must be ${min} characters or more` : ''


export const maxLength15 = maxLength(15)
export const maxLength40 = maxLength(40)
export const maxLength120= maxLength(120)
export const maxLength128= maxLength(128)
export const minLength4= minLength(4)
export const maxLength4= maxLength(4)
export const minLength2= minLength(2)
export const maxLength2= maxLength(2)

export const minLength8= minLength(8)
export const maxLength8= maxLength(8)
export const minLength6= minLength(6)
export const maxLength6= maxLength(6)
export const minLength10= minLength(10)
export const maxLength10= maxLength(10)




export const getFromToDate=(inpdate1:any,duration:any)=>
{

 let inpdate=''
	if(inpdate1==null || inpdate1=='')
    {
	inpdate=getDateYYYYMMDDHHMI(new Date())
    }
    else
    {
     inpdate=inpdate1
    }

	let mi=Number(inpdate.substring(10,13));
	let hh=Number(inpdate.substring(8,10));
	let dd=Number(inpdate.substring(6,8));
	let mm=Number(inpdate.substring(4,6));
    let yyyy=Number(inpdate.substring(0,4));	

   
    
    let strmi=String(mi).padStart(2, '0');
	let strhh=String(hh).padStart(2, '0');
    let strdd=String(dd).padStart(2, '0'); 
	let strmm:any=String(mm).padStart(2, '0'); 
	let stryyyy:any=String(yyyy); 
	let stryyyyplus=String(yyyy+1); 
    let stryyyyminus=String(yyyy-1); 
    let strlastdaymm=String(new Date(stryyyy, strmm, 0).getDate()).padStart(2, '0');
    
	let retobj={};
    let fromdate='';
    let todate='';
    let retObj={};
    
    
  
     var dt1= new Date(yyyy,mm-1,dd,hh,mi)
 
switch(duration) {
  case 'week':
    var firstdayweek = new Date(dt1.getTime());
	var lastdayweek = new Date(dt1.getTime());
    firstdayweek.setDate(firstdayweek.getDate()-firstdayweek.getDay()+1);
  	if(firstdayweek.getDate()>dd){firstdayweek.setDate(firstdayweek.getDate()-7)}
	lastdayweek.setDate(firstdayweek.getDate()+6);
    
    
    
    
    fromdate=getDateYYYYMMDD(firstdayweek);
    todate=getDateYYYYMMDD(lastdayweek);
    break;
  case 'month':
    var firstdaymonth = stryyyy+strmm+'01'
	var lastdaymonth =  stryyyy+strmm+strlastdaymm
    fromdate=firstdaymonth;
    todate=lastdaymonth;    
    break;
    
    
    
        case 'cy':
	var firstdayyear = stryyyy+'01'+'01';
	var lastdayyear = stryyyy+'12'+'31';
    fromdate=firstdayyear;
    todate=lastdayyear;
    break;
    
    
    
    
    case 'cfy':
    if(mm>3 && mm<12)
{
var firstdaycfyyear = stryyyy+'04'+'01'; 
var lastdaycfyyear =  stryyyyplus+'03'+'31'
}
else
{
var firstdaycfyyear =  stryyyyminus+'04'+'01'
var lastdaycfyyear = stryyyy+'03'+'31'
}
    fromdate=firstdaycfyyear;
    todate=lastdaycfyyear;
    break;


    case 'today':

    fromdate=getDateYYYYMMDD(dt1);
    todate=getDateYYYYMMDD(dt1);
    break;


  default:
    fromdate=getDateYYYYMMDD(dt1);
    todate=getDateYYYYMMDD(dt1);
    
    
    
}

retObj={
  fromdate:fromdate,
    todate:todate
    }
    


    return retObj
}


export const   getDtFormat=(inpdate:any)=>
{

  if(inpdate==null|| inpdate=='') return '';
   var dd = inpdate.substring(6,8);
   var mm = inpdate.substring(4,6);
   var yyyy = inpdate.substring(0,4);
   var yy=inpdate.substring(2,4);
   var shortmonths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
   var months=['January','February','March','April','May','June','July','August','September','October','November','December']
  var shortmonth=shortmonths[Number(mm)-1];
   var month=months[Number(mm)-1];
   if(shortmonth==null)
   shortmonth='';

  //  if(month==null)
  //  month='';
  // //console.log('inpdate '+inpdate)
  // //console.log('format '+format)

  //  if(format=='dd/mm/yyyy')
  //  {
  //    //alert(yyyy+'-'+mm+'-'+dd)
  //  	return dd+'/'+mm+'/'+yyyy
  //  }
   
  //  if(format=='dd/MM/yyyy')
  //  {
  //    //alert(yyyy+'-'+mm+'-'+dd)
  //    //console.log(dd+'/'+mm+'/'+yyyy)
  //  	return yyyy+'-'+mm+'-'+dd
  //  }
  //  if(format=='mm/dd/yyyy')
  //  {
  //  	return mm+'/'+dd+'/'+yyyy
  //  }
   
      
  //  if(format=='dd/mon/yyyy')
  //  {
  //  	return dd+'/'+shortmonth+'/'+yyyy
  //  }

  //  if(format=='mon/dd/yyyy')
  //  {
  //  	return shortmonth+'/'+dd+'/'+yyyy
  //  }
   
  //    if(format=='dd/month/yyyy')
  //  {
  //  	return dd+'/'+ month +'/'+yyyy
  //  }

  //  if(format=='month/dd/yyyy')
  //  {
  //  	return month+'/'+dd+'/'+yyyy
  //  }
   
  //  if(format=='dd/mm/yy')
  //  {
  //  	return dd+'/'+mm+'/'+yy
  //  }
   
   
   
   
   return yyyy+"-"+mm+"-"+dd;
}




export const   getTimeFormat=(inpdate:any,format:any)=>
{

  if(inpdate==null|| inpdate=='') return '';
   var hh24 = inpdate.substring(8,10);
   var mi = inpdate.substring(10,13);
   var hh12=''
   var ampm=''


   if(Number(hh24)<12)
  {
    
    hh12=hh24;
    ampm='AM'
  }
  else
  {
    hh12=String(Number(hh24)-12).padStart(2, '0');
    ampm='PM'
  }

   if(format=='hh24mi')
   {
     return hh24+':'+mi
   }
   
   
   if(format=='hh12mi')
   {
   	return hh12 +':'+mi+' '+ampm
   }
   
 
   
   
   return hh24+':'+mi;
}




export const   getDateYYYYMMDD=(inpdate:any)=>
{


   var dd = String(inpdate.getDate()).padStart(2, '0');
   //console.log(inpdate.getMonth())
   var mm = String(inpdate.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = inpdate.getFullYear();

  // return dd+'/'+mm+ '/' + yyyy;return dd+'/'+mm+ '/' + yyyy;
  //alert(yyyy+mm+dd)
  console.log(yyyy+mm+dd)
   return yyyy+mm+dd;
}



export const   getDateYYYYMMDDHHMI=(inpdate:any)=>
{


   var dd = String(inpdate.getDate()).padStart(2, '0');
   var mm = String(inpdate.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = inpdate.getFullYear();
   var hh=String(inpdate.getHours()).padStart(2, '0');
   var mi=String(inpdate.getMinutes()).padStart(2, '0');
  

   return yyyy+mm+dd+hh+mi;
}



export const   getDateYYYYMMDDHHMISS=(inpdate:any)=>
{


   var dd = String(inpdate.getDate()).padStart(2, '0');
   var mm = String(inpdate.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = inpdate.getFullYear();
   var hh=String(inpdate.getHours()).padStart(2, '0');
   var mi=String(inpdate.getMinutes()).padStart(2, '0');
   var ss=String(inpdate.getSeconds()).padStart(2, '0');

   return yyyy+mm+dd+hh+mi+ss;
}

export const getToday=(dtformat:any) =>
{
   var today:any = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();

   if(dtformat=='yyyy-mm-dd')
   today = yyyy+'-'+mm+'-'+dd;

   if(dtformat=='dd-mm-yyyy')
   today = dd+'-'+mm+'-'+yyyy;

   if(dtformat=='dd/mm/yyyy')
   today = dd+'/'+mm+'/'+yyyy;
   
   if(dtformat='')
   today = yyyy+'-'+mm+'-'+dd;

   return today;
}

export const  isValidDate=(s:any) => {
  var d = new Date(s.substring(0,4), s.substring(4,6)-1, s.substring(6,8));

  return d && d.getMonth()+1 == s.substring(4,6);
  
}

export const numberCheck = (value:any) =>
  value && isNaN(Number(value)) ? 'Must be a number' : ''
export const minValue = (min:any) => (value:any) =>
  value && value < min ? `Must be at least ${min}` : ''
export const minValue18 = minValue(18)
export const emailCheck = (value:any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : ''


export const alphaNumericCheck = (value:any) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : ''
export const phoneNumberCheck = (value:any) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : ''

    export const   runCheck = function(checkValue:any,validationArray:any)
    {

      let valueToCheck=checkValue;
    
     
      if(checkValue==null)
      {
      valueToCheck='';
      }
      else
      {
        valueToCheck=checkValue;
      }
  
      var eMessage=""
        for (var index = 0; index < validationArray.length; index++) {
          if(validationArray[index](valueToCheck))
         eMessage = eMessage + validationArray[index](valueToCheck);
  

      }

      return eMessage;

    }
    export const   displayFieldError = function(errorMessage:any)
    {

      if(errorMessage==null)
      return;

      if(errorMessage=='')
      return;

     

      if(errorMessage)
      {
      

      return(
                   // <Text style={styles.textFormat}>{ errorMessage }</Text>

                    <div className="ui large red message "  style={{padding:0 ,textAlign:"left", marginTop:"0" , border: 0,backgroundColor:"transparent",boxShadow:"0 0 0 0px #db2828 inset, 0 0 0 0 transparent" }}>{ errorMessage }</div>
              //    <div className="ui red message">{ errorMessage }</div>
        )
      }
  

    }



    export const   displaySubmitError = function(errorMessage:any)
    {
      

      if(errorMessage.length>0)
      {
       
      return(
              //    <div className="ui red message"> { errorMessage }
               //   </div>
             //  <Text className="ui red message" style={styles.textFormatForm}>{ errorMessage }</Text>
               <div className="ui large red message "  style={{padding:0 ,textAlign:"left", marginTop:"0" , border: 0,backgroundColor:"transparent",boxShadow:"0 0 0 0px #db2828 inset, 0 0 0 0 transparent" }}>{ errorMessage }</div>
        )
      }
      else{
        return(
            <div> </div>
            //<Text></Text>
             )
      }

    }
    


    // const styles =StyleSheet.create({
    //   container_itss:{
    //       justifyContent:'center',
    //       margin:20
    //   },
    //   formInput:{
    //       margin:10
    //   },
    //   formChecckBox:{
    //       margin:40,
    //       backgroundColor:null
    //   },
    //   formButton:{
    //       margin:60
    //   },
      
    //     textFormat:{
    //       color:"red",
         
    //       fontWeight:"bold"
    //     },
    //     textFormatForm:{
    //       color:"red",
    //       fontWeight:"bold",
    //       fontSize:20
    //     }    
      
    // })