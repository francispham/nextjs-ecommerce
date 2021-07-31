import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { perPage } from '../config';
import ErrorMessage from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

function oldPagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if(loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count/perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of {pageCount}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>Page {page} of {pageCount}</p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
};

function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if(loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count/perPage);

  return (
    <div className="inline-grid grid-cols-4 gap-x-4 text-center content-center items-stretch justify-center text-lg my-8  h-16 max-w-xl rounded-lg border">
      <Head>
        <title>Sick Fits - Page {page} of {pageCount}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <span className="relative">
        <span className="absolute top-0 left-0 w-0.5 h-full bg-gray-200"/>
        <p>Page {page} of {pageCount}</p>
        <span className="absolute top-0 right-0 w-0.5 h-full bg-gray-200"/>
      </span>
      <span className="relative">
        <p>{count} Items Total</p>
        <span className="absolute top-0 -right-3 w-0.5 h-full bg-gray-200"/>
      </span>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </div>
  );
};

export default Pagination;
