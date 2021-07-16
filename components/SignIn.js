import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function SignIn() {
  const { inputs, handleChange } = useForm({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>  {/* POST Method prevents password showed on url! */}
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Your Email Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Sign In</button>
      </fieldset>
    </Form>
  );
};