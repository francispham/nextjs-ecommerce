import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

// * Docs: https://graphql.org/learn/queries/
export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
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

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });
  console.log({ data, loading, error });  // ? Dealing with Multiple Values with Object!

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { Product: { name, description, photo } } = data;
  console.log('photo:', photo);
  return <div>
    <img
      src={photo.image.publicUrlTransformed}
      alt={photo.altText}
    />
    <h2>{name}</h2>
    <p>{description}</p>
  </div>;
};