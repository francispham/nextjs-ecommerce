import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY {
    Product(where: {id: "60de542ccae1d88750b2b28a"}) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct() {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  console.log({ data, loading, error });  // ? Dealing with Multiple Values with Object!

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />
  return <div>
    <h2>{data.Product.name}</h2>
  </div>;
};