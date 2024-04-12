import gql from 'graphql-tag';
export default gql`
mutation signInUsername($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    )
    {
      signInUsername(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,

      )
      {
        applicationid
        username
        email
        mobile
        lang
      }
    }  
`;
