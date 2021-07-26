import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return <a className="px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl" type='button' onClick={signout}>Sign Out</a>;
};