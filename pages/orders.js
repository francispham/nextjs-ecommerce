import Head from "next/head";
import Link from "next/link";
import gql from "graphql-tag";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import ErrorMessage from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        price
        description
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrdersStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

function countItemPerOrder(order) {
  return order.items.reduce((acc, item) => acc + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;

  // ? Filter out orders with no items
  const existingOrders = allOrders.filter(order => order.items.length > 0);

  return (
    <div>
      <Head>
        <title>Sick Fits - Your Orders ({existingOrders.length})</title>
      </Head>
      <h2>You have {existingOrders.length}</h2>
      <OrdersStyles>
        {existingOrders.map(order => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemPerOrder(order)} Item{countItemPerOrder(order) > 1 && 's'}</p>
                  <p>{order.items.length} Product{order.items.length > 1 && 's'}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map(item => <img key={item.id} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />)}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrdersStyles>
    </div>
  );
}