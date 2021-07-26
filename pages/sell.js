import CreateProduct from '../components/CreateProduct';
import InitialSignIn from '../components/InitialSignIn';

export default function SellPage() {
  return <div>
    <InitialSignIn>
      <CreateProduct />
    </InitialSignIn>
  </div>;
}
