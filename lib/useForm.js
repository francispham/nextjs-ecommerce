import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // ?  Create a State Object for our Inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');  // * Deep Comparison Shortcut!

  // ?  Have to use useEffect to fix Loading State Issue (when go from edit -> list -> edit)
  useEffect(() => {
    // * This function runs when the things we are watching change!
    setInputs(initial);
  },[initialValues]); // * Because 'initial' is an Object -> cause infinite loop!

  function handleChange(e) {
    let { value, name, type, files } = e.target;

    // ?  Solve number input becomes string when edited
    if(type === 'number') value = parseInt(value);

    // ?  [value] means set Value to be fistArgs in files array including [fistArgs, secondArgs]  
    if(type === 'file') [value] = files;

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