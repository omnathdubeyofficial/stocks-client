import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query   tmasterdocListNew($CLNT: String!,
    $LANG: String!,
    $FROMDT: String!,
    $TODT: String!,
    $STALL: String!,
        )
  {
    tmasterdocListNew(CLNT:$CLNT,LANG:$LANG,FROMDT:$FROMDT,TODT:$TODT,STALL:$STALL)
   {
    CLNT
    LANG
    DOCID
    DOCCONTENT
    {
      menuname
      rate
      qty
      modeofpayment
      cuser
      docdate
    }
  }
  }


`;
