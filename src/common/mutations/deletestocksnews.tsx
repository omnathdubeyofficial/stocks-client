import gql from 'graphql-tag';
export default  gql`
mutation deletestocknews
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $z_id:String
 
)
{
  deletestocknews(
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
