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

  return (
    <a className="relative group flex items-center px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl hover:no-underline" type='button' onClick={signout}>
      <span className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20"/>
      <span className="relative">
        Sign Out
        <span className="absolute w-full h-1 bg-primary -bottom-0 left-0 rounded-sm transform scale-x-0 group-hover:scale-x-100 
          transition ease-bloop duration-400"/>
      </span>
    </a>
  );
};