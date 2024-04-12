import gql from 'graphql-tag';


export const createDocumentMutation= gql`mutation createDocument
(
  
$CLNT: String!,
$LANG: String!,
$DOCID: String!,
$DOCCONTENT: String!,
$CUSER:String!
 
)
{
    createDocument(
    CLNT: $CLNT,
    LANG: $LANG,
    DOCID: $DOCID,
    DOCCONTENT: $DOCCONTENT,
    CUSER:$CUSER
      )
      {
        CLNT
        LANG
		DOCID
		CUSER
         }
    }`;