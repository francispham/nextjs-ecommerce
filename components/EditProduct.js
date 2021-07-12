import { gql, useMutation, useQuery } from "@apollo/client";

// https://nextjs.org/docs/api-reference/next/head
import Head from 'next/head';
import ErrorMessage from "./ErrorMessage";
import { SINGLE_PRODUCT_QUERY, ProductStyles } from './SingleProduct';

const EDIT_PRODUCT_MUTATION = gql`
mutation EDIT_PRODUCT_MUTATION (
  $id: ID!
  $name: String
  $description: String
  $price: Int
) {
  editProduct(
    id: $id
    data: { id: $id, name: $name, description: $description, price: $price }
  ) {
    id
    name
    description
    price
  }
}
`;

export default function EditProduct({ id }) {
  //  ? 1. Getting the Existing Product from query.id in EditPage
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });
  console.log('Data: ', data, 'Loading: ', loading, 'Error: ', error);


  //  ? 2. Using GraphQL Mutation to Edit the Product
  const [
    editProduct,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EDIT_PRODUCT_MUTATION, {
    variables: { id },
    // TODO: Pass In Edited Product here!
  });
  console.log('editProduct:', editProduct);
  console.log('Edit Data: ', editData, 'Edit Loading: ', editLoading, 'Edit Error: ', editError);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { Product: { name, description, photo } } = data;
  console.log('data:', data);

  //  TODO: 3. Create State for Form Input
  //  TODO: 4. Create Form to Handle Edit
  return (
    <ProductStyles>
      <Head>
        <title>Ecommerce | Editing {name}</title>
      </Head>
      <p>EDITING PRODUCT ID: {id}</p>
    </ProductStyles>
  );
};