import gql from 'graphql-tag';
export default  gql`
mutation savestocksnews($client: String,
    $lang: String,
    $applicationid: String,
    $z_id: String,
    $t_id: String,
    $news : String,
    $newsdate : String,
    $delimeter : String,
    $delimetercount : String,
    $isread : String
     )
    {
      savestocksnews(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    z_id:$z_id,
    t_id:$t_id,
    news : $news,
    newsdate : $newsdate,
    delimeter : $delimeter,
    delimetercount : $delimetercount,
    isread : $isread,
      )
      {
        applicationid
    client
    lang,
    z_id,
    t_id,
    news,
    newsdate,
    delimeter,
    delimetercount,
    isread
	}
}

`;










