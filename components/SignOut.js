import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`;

export default function SignOut({text}) {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <span type='button' onClick={signout}>
        {text}
    </span>
  );
};