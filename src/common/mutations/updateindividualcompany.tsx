import gql from 'graphql-tag';
export default gql`
mutation updateIndividualCompany($client: String,
  $lang: String,
  $applicationid: String,
  $z_id: String,
  $recocompany :String
   )
  {
    updateIndividualCompany(
    client: $client,
    lang: $lang,
  applicationid: $applicationid,
  z_id:$z_id,
  recocompany : $recocompany
    )
    {
      applicationid
  client
  lang
  z_id
  t_id
  companyname
  companynews
  date
  isread
  recocompany
  }
  }
`;
