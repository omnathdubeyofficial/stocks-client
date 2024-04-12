import gql from 'graphql-tag';
export default  gql`
 mutation signUpUsername($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    $email: String,
    $mobile: String)
    {
      signUpUsername(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,
    email: $email,
    mobile: $mobile
      )
      {
        applicationid
        username
		lang
		mobile
		email
	  }
    }
  
`;
