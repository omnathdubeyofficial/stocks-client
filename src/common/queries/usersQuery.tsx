import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query($applicationid:String!,$client:String!,$lang:String!)
{
  users(
	  applicationid:$applicationid,
    client:$client,
    lang:$lang
  )
  {
    applicationid
    client
    lang
	  username
    email
    mobile
    firstname
    lastname
    userauthorisations
    status
    z_id
  }
}

`;
