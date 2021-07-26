import Link from 'next/link';

import NavStyles from './styles/NavStyles';

import { useCart } from '../lib/cartState.js';
import { useUser } from './User';

import SignOut from './SignOut';
import CartCount from './CartCount';
import link from 'next/link';

function OldNav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem?.quantity, 0)} />
          </button>
        </>
      )}
    </NavStyles>
  );
}

const links = [
  {
    href: '/products',
    text: 'Products',
  },
  {
    href: '/sell',
    text: 'Sell',
  },
  {
    href: '/orders',
    text: 'Orders',
  },
  {
    href: '/account',
    text: 'Account',
  },
];

function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <nav className="mt-4 flex-1 flex flex-wrap xl:mt-0 xl:justify-end">
      {user ? (
        <>
          {links.map(({ href, text }) => (
            <Link key={text} href={href}>
              <a className="px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl">{text}</a>
              </Link>
          ))}
          <SignOut />
          <a className="flex px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl text-center" type="button" onClick={openCart}>
            My Cart
            <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem?.quantity, 0)} />
          </a>
        </>
      ) : <Link href="/products"><a className="px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl">Products</a></Link>}
    </nav>
  );
}

export default Nav;