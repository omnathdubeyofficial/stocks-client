import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query
{
  recommendationItems
  {
   label
   value
  }
}

`;
