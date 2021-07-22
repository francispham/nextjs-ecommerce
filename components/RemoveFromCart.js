import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
            // * Docs: https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict
  cache.evict(cache.identify(payload.data.deleteCartItem));   // * Docs: https://www.apollographql.com/docs/react/caching/cache-interaction/#obtaining-an-objects-custom-id
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    // * Docs: https://www.apollographql.com/docs/react/data/mutations/#options
    variables: { id },
    update,
    // ?  update your UI optimistically, making your app feel more responsive to the user.
    /*  
    TODO: Make this optional works! 
      optimisticResponse: {   // * Docs: https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option
        deleteCartItem: { 
          __typename: "CartItem",
          id 
        },
      },
    */ 
  });

  return (
    <BigButton 
      type="button" 
      disabled={loading} 
      className="btn btn-danger" 
      onClick={removeFromCart}
    >
      &times;
    </BigButton>
  );
};
