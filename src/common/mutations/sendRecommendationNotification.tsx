import gql from 'graphql-tag';
export default  gql`
mutation sendRecommendationNotification
(
  
  $recommendation:inputRecommendationType

 
)
{
    sendRecommendationNotification(
   recommendation: $recommendation

      )
      {
        z_id
         }
    }
  
`;