import useForm from '../lib/useForm';
import Form from "./styles/Form";

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: {},
    name: 'Francis',
    price: 123123,
    description: 'Say my Name',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    clearForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset */}
      <fieldset>  {/* Help set Attributes for the whole group of inputs!!! */}
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