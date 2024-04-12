import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query($applicationid:String!,$client:String!,$lang:String!,$z_id:String)
{
  stocksnews(
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
    news ,
        delimeter ,
         delimetercount ,
          newsdate ,
           isread ,
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