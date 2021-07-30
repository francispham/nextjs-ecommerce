import Link from 'next/link';

import NavStyles from './styles/NavStyles';

import { useCart } from '../lib/cartState.js';
import { useUser } from './User';

import SignOut from './SignOut';
import CartCount from './CartCount';

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
  {
    href: '/signin',
    text: 'Sign Out',
  },
  {
    href: '',
    text: 'My Cart',
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
            <Link key={text} href={href} passHref>
              <a className="relative group flex items-center px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl hover:no-underline">
                <span className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20"/>
                <span className="relative">
                  {
                    text === 'Sign Out' ? <SignOut text={text} /> 
                    : text === 'My Cart' 
                    ? <span className="flex items-center space-x-2" type="button" onClick={openCart}>
                        <span>My Cart</span>
                        <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem?.quantity, 0)} />
                      </span> 
                    : text
                  }
                  <span className="absolute w-full h-1 bg-primary -bottom-0 left-0 rounded-sm transform scale-x-0 group-hover:scale-x-100 
                    transition ease-bloop duration-400"/>
                </span>
              </a>
            </Link>
          ))}
        </>
      ) : (
        <Link href={links[0].href}>
          <a className="relative group flex items-center px-8 text-xl uppercase flex-shrink-0 xl:px-8 xl:text-xl hover:no-underline">
            <span className="absolute top-0 left-0 w-0.5 h-full bg-gray-200 transform -skew-x-20"/>
            <span className="relative">
              {links[0].text}
              <span className="absolute w-full h-1 bg-primary -bottom-0 left-0 rounded-sm transform scale-x-0 group-hover:scale-x-100 
                transition ease-bloop duration-400"/>
            </span>
          </a>        
        </Link>
      )}
    </nav>
  );
}

export default Nav;