import gql from 'graphql-tag';
export default gql`
mutation savecompanystatus(
  $client: String,
  $lang: String,
  $applicationid: String,
  $z_id: String,
  $t_id: String,
  $companyname: String,
  $status: String,
  $reviewdate: String,
  $comment: String
) {
  savecompanystatus(
    client: $client,
    lang: $lang,
    applicationid: $applicationid,
    z_id: $z_id,
    t_id: $t_id,
    companyname: $companyname,
    status: $status,
    reviewdate: $reviewdate,
    comment: $comment
  ) {
    applicationid
    client
    lang
    z_id
    t_id
    companyname
    status
    reviewdate
    comment
  }
}`;