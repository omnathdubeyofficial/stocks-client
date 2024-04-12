import gql from 'graphql-tag';
export default  gql`
mutation deleteUsername
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $username:String,
  $z_id:String
 
)
{
    deleteUsername(
   applicationid: $applicationid,
    client: $client,
    lang: $lang,
    username: $username,
    z_id:$z_id
      )
      {
    username
         }
    }
  
`;
