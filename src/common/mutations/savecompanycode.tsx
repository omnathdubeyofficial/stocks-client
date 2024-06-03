import gql from 'graphql-tag';
export default gql`
mutation savecompanycodes(
  $client: String,
  $lang: String,
  $applicationid: String,
  $z_id: String,
  $t_id: String,
  $code_code: String,
  $code_type: String,
  $code_desc: String,
  $code_desc1: String,
  $code_desc2: String
) {
  savecompanycodes(
    client: $client,
    lang: $lang,
    applicationid: $applicationid,
    z_id: $z_id,
    t_id: $t_id,
    code_code: $code_code,
    code_type: $code_type,
    code_desc: $code_desc,
    code_desc1: $code_desc1,
    code_desc2: $code_desc2
  ) {
    applicationid
    client
    lang
    z_id
    t_id
    code_code
    code_type
    code_desc
    code_desc1
    code_desc2
  }
}
`;