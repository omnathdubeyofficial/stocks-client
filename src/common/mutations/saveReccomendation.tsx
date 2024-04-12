import gql from 'graphql-tag';
export default  gql`
 mutation saveRecommendation($client: String,
    $lang: String,
    $applicationid: String,
    $z_id: String,
    $t_id: String,
    $name: String,
    $recodate: String,
    $cmp: String,
    $addupto:String,
    $sl:String,
    $target1:String,
    $target2:String,
    $target3:String,
    $target4:String,
    $target5:String,
    $target6:String,
    $target7:String,
    $target8:String,
    $target9:String,
    $weightage:String,
    $timeframe:String,
    $reffiles:[FileType]
     )
    {
        saveRecommendation(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    z_id:$z_id,
    t_id:$t_id,
    name: $name,
    recodate: $recodate,
    cmp:$cmp,
    addupto:$addupto,
    sl:$sl,
    target1:$target1,
    target2:$target2,
    target3:$target3,
    target4:$target4,
    target5:$target5,
    target6:$target6,
    target7:$target7,
    target8:$target8,
    target9:$target9,
    weightage:$weightage,
    timeframe:$timeframe,
    reffiles:$reffiles
      )
      {
        applicationid
    client
    lang,
    z_id,
    t_id
    name
    recodate
    cmp
    addupto
    sl
    target1
    target2
    target3
    target4
    target5
    target6
    target7
    target8
    target9
    weightage
    timeframe
    reffiles{z_id,
    fileid,
    filepath,
    filename,
    filetype,
    filesize}
	  }
    }
  
`;
