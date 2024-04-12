import gql from 'graphql-tag';
export default  gql`
mutation saveUsername($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    $email: String,
    $mobile: String,
    $firstname:String,
    $lastname:String,
    $userauthorisations:String,
    $status:String,
    $z_id:String
     )
    {
      saveUsername(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,
    email: $email,
    mobile: $mobile,
    firstname:$firstname,
    lastname:$lastname,
    userauthorisations:$userauthorisations,
    status:$status,
    z_id:$z_id
      )
      {
        applicationid
        username
		lang
		mobile
		email
        firstname
        lastname
        userauthorisations
        status
        z_id
	  }
    }
`;

