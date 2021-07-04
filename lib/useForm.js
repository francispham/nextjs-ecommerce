import { useState } from 'react';

export default function useForm(initial = {}) {
  // ?  Create a State Object for our Inputs
  const [inputs, setInputs] = useState(initial);
  
  function handleChange(e) {
    let { value, name, type } = e.target;

    // ?  Solve number input becomes string when edited
    if(type === 'number') value = parseInt(value);

    setInputs({
      // ?  Copy the existing State
      ...inputs,
      [name]: value  
    });
  };

  function resetForm() {
    setInputs(initial);
  };

  function clearForm() {
    // ?  Convert Object to Array of key-value Arrays -> Change value to ''
    let blankState = Object.entries(inputs).map(([key, value]) => [key, '']);
    // ?  Convert Modified Array back to Object
    blankState = Object.fromEntries(blankState);
    /* Same as: 
      const blankState = Object.fromEntries(
        Object.entries(inputs).map(([key]) => [key, ''])
      );
    */ 

    setInputs(blankState);
  };

  // ?  Return the effect we want to surface from this custom HOOK
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  };
};