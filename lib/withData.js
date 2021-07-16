// https://www.apollographql.com/docs/react/
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

// ! Deprecated Package! Use this: https://www.apollographql.com/docs/react/api/link/apollo-link-error/
import { onError } from '@apollo/link-error';

// https://www.apollographql.com/docs/react/api/react/ssr/#getdatafromtree
import { getDataFromTree } from '@apollo/client/react/ssr';

// https://www.npmjs.com/package/apollo-upload-client
import { createUploadLink } from 'apollo-upload-client';

// https://www.npmjs.com/package/next-with-apollo
import withApollo from 'next-with-apollo';

import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  // *  Docs: https://www.apollographql.com/docs/react/api/core/ApolloClient/
  return new ApolloClient({
    // *  Docs: https://www.apollographql.com/docs/react/api/link/introduction/
    link: ApolloLink.from([
      // * Docs: https://www.apollographql.com/docs/react/api/link/apollo-link-error/
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // *  This uses apollo-link-http under the hood: https://www.apollographql.com/docs/react/api/link/apollo-link-http/, so all the Options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // *  Passed the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    // * Docs: https://www.apollographql.com/docs/react/api/cache/InMemoryCache/
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // ?  When the 'fields' coming, all Variables will be handled manually through 'paginationField'
            allProducts: paginationField(),   //  * Docs: https://www.apollographql.com/docs/react/pagination/overview/
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
