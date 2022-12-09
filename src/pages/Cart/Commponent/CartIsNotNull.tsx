import React from 'react';
import CartItem from './CartItem';
import CartAside from './CartAside';
import './CartIsNotNull.scss';

interface CartItemTypes {
  productId: string;
  discountPrice: string;
  cartId: string;
  thumbnail: string;
  quantity: number;
  productName: string;
  size: string;
  retailPrice: string;
  styleCode: string;
}

interface PropsTypes {
  cartItems: Array<CartItemTypes>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemTypes[]>>;
  pageReloader: boolean;
  setPageReloader: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartIsNotNull({
  cartItems,
  setCartItems,
  pageReloader,
  setPageReloader,
}: PropsTypes) {
  async function delCartItemAll(event: React.MouseEvent) {
    fetch(`http://192.168.243.200:8000/carts`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token') || 'noToken',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'All carts were deleted') {
          alert('전체제품이 삭제되었습니다.');
          const eventNativeEvent = event.nativeEvent as any;
          eventNativeEvent.path[2].innerHTML = '';
        }
      });
  }
  return (
    <article className="cartWrapper">
      <section className="cartItemsListWrapper">
        <div className="cartItemsListHeader">
          <button
            type="button"
            className="cartDelItems"
            onClick={delCartItemAll}
          >
            전체삭제
          </button>
        </div>
        <ul className="cartItemsList">
          {cartItems &&
            cartItems.map(cartItemElement => (
              <CartItem
                key={cartItemElement.cartId}
                cartItemElement={cartItemElement}
                pageReloader={pageReloader}
                setPageReloader={setPageReloader}
              />
            ))}
        </ul>
      </section>
      <CartAside cartItems={cartItems} setCartItems={setCartItems} />
    </article>
  );
}

export default CartIsNotNull;
