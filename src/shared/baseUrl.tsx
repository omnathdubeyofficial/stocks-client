

//export const baseUrl='http://localhost:8080/'



export const baseUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}`

export const fileUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/`


export const getfileUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/getfile`;
export const uploadUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/uploadfile`;
export const deleteUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/deletefile`;

export const notificationSubscribeUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/notifications/subscribe`;


export const getCaptchaSitekey =()=>{


    console.log(window.location.protocol)
    console.log(window.location.hostname)
    console.log(window.location.port)

    if(window.location.hostname!='localhost'){
        console.log('server')
    return '6LcBbhgeAAAAAGwrYBdfsbKOJ8WjlbFPYmLtLw7L'
}
else{
    console.log('client')
    return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
}

}


export const urlBase64ToUint8Array= (base64String) =>{
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }




export const gqlUrl=baseUrl+'/gqlapi'
//export const gqlUrl=baseUrl+'/gqlapi'
export const misUrl='http://81.4.102.11:8081/graphql'
export const masterDataUrl='http://localhost:8080/md'


