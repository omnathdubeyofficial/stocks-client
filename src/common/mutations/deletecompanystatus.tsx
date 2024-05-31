import gql from 'graphql-tag';
export default gql`
mutation deletecompanystatus
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $z_id:String
 
)
{
  deletecompanystatus(
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