// https://www.apollographql.com/docs/react/api/react/hooks/#usemutation
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from "./styles/Form";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which Variables are getting passed in? And what Types are they?
    $name: String!
    $description: String!
    $price: Int!
    # Docs: https://www.graphql-modules.com/docs/index
    $image: Upload  # More Docs: https://github.com/jaydenseric/graphql-upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ){
    id
    name
    price
    description
  }
  } 
`;

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: {},
    name: 'Francis',
    price: 123123,
    description: 'Say my Name',
  });

  // * Docs: https://www.apollographql.com/docs/react/data/mutations/
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION, 
    { variables: inputs },
  );
  console.log('resData:', data);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // ? Submit the Input Fields to the Backend! 
    await createProduct();  //  * Variables are passed in useMutation! If not, use: createProduct({ variables: inputs })
    clearForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset */}
      <fieldset disabled={loading} aria-busy={loading}>  {/* Help set Attributes for the whole group of inputs!!! */}
        <label htmlFor='image'>
          Image
          <input 
            type='file'
            id='image'
            name='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input 
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
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
            value={inputs.price}
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
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type='submit'>+ Add Product</button>
      <button type='button' onClick={clearForm}>Clear Form</button>
      <button type='button' onClick={resetForm}>Reset Form</button>
    </Form>
  );
};