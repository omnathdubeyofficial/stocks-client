import gql from 'graphql-tag';

export default gql`
  {
    currentUsername
   {
    username
    email
    lang
    applicationid
  }
  }
`;



