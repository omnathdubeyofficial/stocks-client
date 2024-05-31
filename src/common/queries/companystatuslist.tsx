import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query($applicationid:String!,$client:String!,$lang:String!,$z_id:String)
{
  companystatuslists(
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
    companyname ,
        status ,
         reviewdate ,
          comment ,
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