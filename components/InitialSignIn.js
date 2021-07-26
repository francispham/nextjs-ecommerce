import { useUser } from './User';
import SignIn from './SignIn';

export default function ({ children }) {
  const currentUser = useUser();

  if (!currentUser) return <SignIn />;
  return children;
}
