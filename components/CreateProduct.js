import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Francis',
    price: 123123,
    description: 'Say my Name',
  });

  return (
    <form>
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
      <button type='button' onClick={clearForm}>Clear Form</button>
      <button type='button' onClick={resetForm}>Reset Form</button>
    </form>
  );
};