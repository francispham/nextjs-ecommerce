import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  //  * Docs: https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict
  cache.evict(cache.identify(payload.data.deleteProduct));  // * Docs: https://www.apollographql.com/docs/react/caching/cache-interaction/#obtaining-an-objects-custom-id
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(
    DELETE_PRODUCT_MUTATION, 
    { 
      variables: { id },
      update  // * Docs: https://www.apollographql.com/docs/react/data/mutations/#options
    }
  );

  return (
    <button 
      type='button'
      disabled={loading}
      onClick={() => {
        // * https://stackoverflow.com/questions/19404352/difference-between-window-confirm-and-just-confirm
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch(err => alert(err.message));
          console.log('deleted');
        }
      }}
    >
      {children}
    </button>
  );
};