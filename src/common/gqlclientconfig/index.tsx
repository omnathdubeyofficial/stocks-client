//import ApolloBoostClient from 'apollo-boost';
//import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import {gqlUrl,misUrl} from '../../shared/baseUrl'
const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
  }


  const authLink = setContext(async (req, { headers }) => {
   const token = sessionStorage.getItem('jwtToken');
   //var token='';
   // console.log('AsyncStorage ----token----start');
   
    // try {
    //    token = await AsyncStorage.getItem('jwtToken');
    //   if (token !== null) {
    //     // We have data!!
    //   //  console.log(token);
    //   }
    //  } catch (error) {
    //    // Error retrieving data
    //  }
  

    return {
      ...headers,
      headers: {
        authorization: token ? `${token}` : null,
      },
    };
  });
  


// local host
const client = new ApolloClient({
    link: authLink.concat(createHttpLink(
        { uri: gqlUrl, 
        credentials: 'include'})),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });



  // local host
const misclient = new ApolloClient({
  link: authLink.concat(createHttpLink(
      { uri: misUrl, 
      credentials: 'include'})),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});






export const execGqlURL = function(gqlType:any,gqlTypeName:any,gqlVariables:any,gqlURL:any)
{



  // local host
const clientURL = new ApolloClient({
  link: authLink.concat(createHttpLink(
      { uri: gqlURL, 
      credentials: 'include'})),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});




    const promise = new Promise((resolve, reject) => {
        
        if(gqlType=='mutation')
        {
           console.log('execGql-1');
           clientURL.mutate({mutation : gqlTypeName, variables:gqlVariables})
            .then(result => {  
              
        //      console.log('execGql-result');
         //     console.log(result);
              resolve(result) } )
             .catch(err=>{ 
              console.log('execGql-err');
              console.log(err);
                const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message);
                const errorMessageGql = errorsGql.join();
                reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
              })
                
        }
        if(gqlType=='query')
        {
         
          
       //   console.log('gqlTypeName ');
             
      //    console.log(gqlTypeName);


          
      //    console.log('gqlVariables');
             
      //    console.log(gqlVariables);


          
          clientURL.query({query : gqlTypeName, variables:gqlVariables})
            .then(result => {  resolve(result) } )
             .catch(err=>{ 


              console.log('query error');
             
              console.log(err);

              console.log('query error end ');

                const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message   );
                const errorMessageGql = errorsGql.join();
             //   console.log('err');console.log(err);
                reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
              })


                
        }




      });
      return promise;
}





    
export const execGql = function(gqlType:any,gqlTypeName:any,gqlVariables:any)
{
console.log(gqlTypeName,gqlVariables)
    const promise = new Promise((resolve, reject) => {
        
        if(gqlType=='mutation')
        {
          console.log('execGql-1 *********************');
             client.mutate({mutation : gqlTypeName, variables:gqlVariables})
            .then(result => {  
              
              console.log('execGql-result');
              console.log(result);
              resolve(result) } )
             .catch(err=>{ 
              console.log('execGql-err');
              console.log(err);
                const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message);
                const errorMessageGql = errorsGql.join();
                reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
              })
                
        }
        if(gqlType=='query')
        {
         
          
       //   console.log('gqlTypeName ');
             
       //   console.log(gqlTypeName);


          
       //   console.log('gqlVariables');
             
        //  console.log(gqlVariables);


          
               client.query({query : gqlTypeName, variables:gqlVariables})
            .then(result => { 
              
          
              
              resolve(result) } )
             .catch(err=>{ 


              console.log('query error');
             
              console.log(err);

              console.log('query error end ');

                const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message   );
                const errorMessageGql = errorsGql.join();
             //   console.log('err');console.log(err);
                reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
              })


                
        }




      });
      return promise;
}


export const  execGql_xx =  function(gqlType:any,gqlTypeName:any,gqlVariables:any)
{ 
        if(gqlType=='mutation')
        {
           
        return (   client.mutate({mutation : gqlTypeName, variables:gqlVariables}) )
            
        }
        if(gqlType=='query')
        {
         return (   client.query({query : gqlTypeName, variables:gqlVariables}))
        }


        
 }
     




 export const execmisGql = function(gqlType:any,gqlTypeName:any,gqlVariables:any)
 {
 
     const promise = new Promise((resolve, reject) => {
         
         if(gqlType=='mutation')
         {
        //    console.log('execGql-1');
            misclient.mutate({mutation : gqlTypeName, variables:gqlVariables})
             .then(result => {  
               
           //    console.log('execGql-result');
            //   console.log(result);
               resolve(result) } )
              .catch(err=>{ 
               console.log('execGql-err');
               console.log(err);
                 const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message);
                 const errorMessageGql = errorsGql.join();
                 reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
               })
                 
         }
         if(gqlType=='query')
         {
          
           
           console.log('gqlTypeName ');
              
           console.log(gqlTypeName);
 
 
           
           console.log('gqlVariables');
              
           console.log(gqlVariables);
 
 
           
           misclient.query({query : gqlTypeName, variables:gqlVariables})
             .then(result => {  console.log('gql query result .... ');  console.log(result);   resolve(result) } )
              .catch(err=>{ 
 
 
               console.log('query error');
              
               console.log(err);
 
               console.log('query error end ');
 
                 const errorsGql = err.graphQLErrors.map((graphQLerror:any) => graphQLerror.message   );
                 const errorMessageGql = errorsGql.join();
              //   console.log('err');console.log(err);
                 reject({ 'errorsGql': errorsGql ,'errorMessageGql': errorMessageGql}) 
               })
 
 
                 
         }
 
 
 
 
       });
       return promise;
 }
 