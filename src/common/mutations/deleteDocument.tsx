import gql from 'graphql-tag';


export const deleteDocumentMutation= gql`mutation deleteDocument
(
  
$CLNT: String!,
$LANG: String!,
$DOCID: String!
 
)
{
    deleteDocument(
    CLNT: $CLNT,
    LANG: $LANG,
    DOCID: $DOCID
      )
      {
        CLNT
        LANG
		DOCID
		
         }
    }`;