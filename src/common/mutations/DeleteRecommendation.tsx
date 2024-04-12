import gql from 'graphql-tag';
export default  gql`
mutation deleteRecommendation
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $z_id:String
 
)
{
    deleteRecommendation(
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