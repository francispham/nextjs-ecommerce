import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const NotifStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(error => console.error(error));
    resetForm();
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Up for An Account</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <NotifStyles>
            <p>Signed Up with {data.createUser.email} - Please Go A Head and Sign In</p>
          </NotifStyles>
        )}
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type='submit'>Sign Up</button>
      </fieldset>
    </Form>
  );
};