import Supreme from './styles/Supreme.js';
import CartStyles from './styles/CartStyles.js';
import CloseButton from './styles/CloseButton.js';

import CartItem from './CartItem';
import { useUser } from './User.js';
import { Checkout } from './Checkout.js';

import { useCart } from '../lib/cartState.js';
import formatMoney from '../lib/formatMoney.js';
import calcTotalPrice from '../lib/calcTotalPrice.js';

export default function Cart() {
  const currentUser = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!currentUser) return null;

  return <CartStyles open={cartOpen}>
    <header>
      <Supreme>{currentUser.name}'s Cart</Supreme>
      <CloseButton type="button" onClick={closeCart}>&times;</CloseButton>
    </header>
    <ul>
      {currentUser.cart.map(item => <CartItem key={item.id} cartItem={item} />)}
    </ul>
    <footer>
      <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
      <Checkout />
    </footer>
  </CartStyles>;
}