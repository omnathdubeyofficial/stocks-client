import gql from 'graphql-tag';
export const getSummaryMutation= gql`mutation getSummary
( $CLNT: String!,
    $LANG: String!,
    $FROMDT: String!,
    $TODT: String!,
    $STALL: String!,

)
{
    getSummary(
    CLNT: $CLNT,
    LANG: $LANG,
    FROMDT: $FROMDT,
    TODT: $TODT,
    STALL:$STALL
      )
      {
        StallSummary{
            stallList
            {
                stall
            vegsteamedplates
            vegfriedplates
            nonvegsteamedplates
            nonvegfriedplates
            vegsteamedamount
            vegfriedamount
            nonvegsteamedamount
            nonvegfriedamount
            total
            onlinetotal
            cashtotal
            },
            total
            {
                stall
            vegsteamedplates
            vegfriedplates
            nonvegsteamedplates
            nonvegfriedplates
            vegsteamedamount
            vegfriedamount
            nonvegsteamedamount
            nonvegfriedamount
            total
            onlinetotal
            cashtotal
            }
        }
        }
         
    }
	
	`;

