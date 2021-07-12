import { useQuery } from "@apollo/client";

// https://nextjs.org/docs/api-reference/next/head
import Head from 'next/head';
import { SINGLE_PRODUCT_QUERY, ProductStyles } from './SingleProduct';

export default function EditProduct({ id }) {
  //  ? 1. Getting the Existing Product from query.id in EditPage
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });
  console.log('Data: ', data, 'Loading: ', loading, 'Error: ', error);

  //  TODO: 2. Using GraphQL Mutation to Edit the Product
  //  TODO: 3. Create State for Form Input
  //  TODO: 4. Create Form to Handle Edit
  return (
    <ProductStyles>
      <Head>
        <title>Ecommerce</title>
      </Head>
      <p>EDITING PRODUCT ID: {id}</p>
    </ProductStyles>
  );
};