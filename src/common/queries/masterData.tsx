import gql from 'graphql-tag';
export default gql`
query MasterData($CLNT: String!,
    $LANG: String!)
{
  
  taxrates(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
 cmpn
  rate
  tax
  taxtype
  }
  
    taxgroups(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
    id
    cmpn
    taxes
    taxgroup
  }
  
  taxtypes(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
     cmpn
    taxtype
  }
   parties(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
    id
cmpn
partycode
partyname
glaccount
clnt
lang
  }
  
  
     companies(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
    id
cmpn
cmpnname
clnt
lang
isdefault
  }
  
       items(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
  id
  cmpn
  itemcode
  itemtext
  uom
  taxgroup
  glaccount
  clnt
  lang
  sellprice
  sellpricetaxinclusion
  auom
  }
  
       paymodes(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
   id
  cmpn
  paymode
  paymodetext
  glaccount
  isdefault
  clnt
  lang
 }
  
  
  
         glaccounts(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
  id
  cmpn
  glaccount
  gltext
  glaccount
  clnt
  lang
 }



         payterms(where: {
    clnt:$CLNT,
     lang:$LANG
  })
  {
    id
cmpn
code
text
isdefault
doctype
clnt
lang
 }




states
  {
id
code
text
 }
  
}

`;