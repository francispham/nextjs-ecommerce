import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from 'styled-components';

// https://nextjs.org/docs/api-reference/next/head
import Head from 'next/head';

import ErrorMessage from "./ErrorMessage";

// * Docs: https://graphql.org/learn/queries/
export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: {id: $id}) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    padding: 2rem;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });
  console.log({ data, loading, error });  // ? Dealing with Multiple Values with Object!

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { Product: { name, description, photo } } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Ecommerce | {name}</title>
      </Head>
      <img
        src={photo.image.publicUrlTransformed}
        alt={photo.altText}
      />
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
};