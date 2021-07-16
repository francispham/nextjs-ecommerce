import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY =gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {   # https://graphql.org/learn/queries/#inline-fragments
        id
        email
        name
        # TODO: Query the Cart once we have it!
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}