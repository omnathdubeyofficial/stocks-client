import gql from 'graphql-tag';

export default gql`
  mutation {
    signOutUsername {
      applicationid
	  client
	  lang
	  email
	  username
	  mobile
    }
  }
`;
