import { gql, useMutation, useQuery } from "@apollo/client";

// https://nextjs.org/docs/api-reference/next/head
import Head from 'next/head';

import { SINGLE_PRODUCT_QUERY, ProductStyles } from './SingleProduct';
import ErrorMessage from "./ErrorMessage";
import useForm from '../lib/useForm';
import Form from "./styles/Form";

const EDIT_PRODUCT_MUTATION = gql`
mutation EDIT_PRODUCT_MUTATION (
  $id: ID!
  $name: String
  $description: String
  $price: Int
) {
  updateProduct(  # Check for Mutations: http://localhost:3000/api/graphql
    id: $id
    data: { name: $name, description: $description, price: $price }
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

  //  ? 2. Using GraphQL Mutation to Edit the Product
  const [
    updateProduct,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation(EDIT_PRODUCT_MUTATION);
  console.log('Edit Data: ', editData, 'Edit Loading: ', editLoading, 'Edit Error: ', editError);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  //  ? 3. Create State for Form Input
  const { inputs: { name, description, price }, handleChange } = useForm(data?.Product);
  //  ? 4. Create Form to Handle Edit
  return (
    <ProductStyles>
      <Head>
        <title>Ecommerce | Editing {name}</title>
      </Head>
      <p>EDITING PRODUCT ID: {id}</p>
      <Form onSubmit={async (e) => {
        e.preventDefault();

        // ? Handle Submit:
        await updateProduct({
          variables: { 
            id,
            name,
            description,
            price,
          },
        }).catch(console.error);
      }}>
        <ErrorMessage error={editError} />
        <fieldset disabled={editLoading} aria-busy={editLoading}>
          <label htmlFor='name'>
            Name
            <input 
              type='text'
              id='name'
              name='name'
              placeholder='Name'
              value={name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='price'>
            Price
            <input 
              type='number'
              id='price'
              name='price'
              placeholder='Price'
              value={price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='description'>
            Description
            <textarea 
              type='text'
              id='description'
              name='description'
              placeholder='Description'
              value={description}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button type='submit'>Edit Product 📝 </button>
      </Form>
    </ProductStyles>
  );
};