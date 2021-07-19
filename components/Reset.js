import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
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

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const errorMessage = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken 
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(error => console.error(error));
    resetForm();
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Request A Password Reset</h2>
      <ErrorMessage error={errorMessage || error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <NotifStyles>
            <p>Success! You can now sign in!</p>
          </NotifStyles>
        )}
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
        <button type='submit'>Password Reset</button>
      </fieldset>
    </Form>
  );
};