import Supreme from './styles/Supreme.js';
import CartStyles from './styles/CartStyles.js';

import { useUser } from './User.js';
import CartItem from './CartItem';

import formatMoney from '../lib/formatMoney.js';
import calcTotalPrice from '../lib/calcTotalPrice.js';

export default function Cart() {
  const currentUser = useUser();

  if (!currentUser) return null;
  console.log('currentUser:', currentUser);

  return <CartStyles open>
    <header>
      <Supreme>{currentUser.name}'s Cart</Supreme>
    </header>
    <ul>
      {currentUser.cart.map(item => <CartItem key={item.id} cartItem={item} />)}
    </ul>
    <footer>
      <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
    </footer>
  </CartStyles>;
}