// https://nextjs.org/docs/api-reference/next/router
import { useRouter } from 'next/dist/client/router';

import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  //  * Docs: https://nextjs.org/docs/routing/introduction
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
};