import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query($applicationid:String!,$client:String!,$lang:String!,$z_id:String)
{
  companycodeslists(
	  applicationid:$applicationid,
    client:$client,
    lang:$lang,
    z_id:$z_id
  )
  {
    z_id ,
    applicationid ,
    client ,
    lang ,
    t_id ,
    code_code,
    code_type,
    code_desc,
    code_desc1,
    code_desc2,
    cdate ,
        ctime ,
        cuser ,
        udate ,
        utime ,
        uuser ,
        ddate ,
        dtime ,
  duser}
}
`;