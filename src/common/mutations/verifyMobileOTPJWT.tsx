import gql from 'graphql-tag';

export default gql`
mutation verifyMobileOTPJWT($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    $email: String,
    $mobile: String,
$mobileotp: String)
    {
      verifyMobileOTPJWT(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,
    email: $email,
    mobile: $mobile,
        mobileotp:$mobileotp
      )
      {
        applicationid
        username
		lang
		mobile
        email
        token
	  }
    }`