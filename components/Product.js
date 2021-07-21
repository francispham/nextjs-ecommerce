// https://nextjs.org/docs/api-reference/next/link
import Link from 'next/link';

import formatMoney from '../lib/formatMoney';

import ItemStyled from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
  return (
    <ItemStyled>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>
          {product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>

      <div className='buttonList'>
        <Link href={{
          pathname: '/edit',
          query: {
            id: product.id
          }
        }}>
          Edit 📝
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyled>
  );
};