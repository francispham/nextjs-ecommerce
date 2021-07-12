import EditProduct from '../components/EditProduct';

export default function EditPage({ query }) {
  return <div><EditProduct id={query.id} /></div>;
}
