import gql from 'graphql-tag';
export default gql`
mutation deletecompanycodes
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $z_id:String
 
)
{
  deletecompanycodes(
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