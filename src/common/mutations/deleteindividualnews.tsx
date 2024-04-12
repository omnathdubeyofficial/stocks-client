import gql from 'graphql-tag';
export default  gql`
mutation deleteindividualnews
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $z_id:String
 
)
{
  deleteindividualnews(
   applicationid: $applicationid,
    client: $client,
    lang: $lang,
    z_id:$z_id
      )
      {
    z_id
         }
    }
  
`;
