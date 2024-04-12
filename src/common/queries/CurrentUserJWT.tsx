import gql from 'graphql-tag';

export default gql`
  {
    currentUsernameJWT
   {
    username
    email
    lang
    applicationid
    userauthorisations
    status,
    firstname,
    lastname
  }
  }
`;
