import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query getRecommendations($infostring: String!) {
  getRecommendations(infostring: $infostring) {
    recodate
    name
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
    timeframe
    weightage
    comment1
    comment2
  }
}


`;