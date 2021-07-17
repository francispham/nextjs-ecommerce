import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });

  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // ? Refetch   the currently logged in User
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  const errorMessage = data?.authenticateUserWithPassword.__typename ===
  'UserAuthenticationWithPasswordFailure'
    ? data?.authenticateUserWithPassword : undefined;

  async function handleSubmit(e) {
    e.preventDefault();

    // ? Send the Email and Password to the graphQL API
    await signin();
    resetForm();
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>  {/* POST Method prevents password showed on url! */}
      <h2>Sign Into Your Account</h2>
      <ErrorMessage error={errorMessage} />
      <fieldset disabled={loading} aria-busy={loading}>
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