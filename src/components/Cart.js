import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, decrementFromCart, addToCart } from '../store/actions/cartActions';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDecrementFromCart = (productId) => {
    dispatch(decrementFromCart(productId));
  };

  const handleIncrementFromCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="cart">
      <h2>Keranjang</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong nih!!</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Kuantitas: {item.quantity}</p>
                <button onClick={() => handleDecrementFromCart(item.id)}>-</button>
                <button onClick={() => handleIncrementFromCart(item)}>+</button>
                <button onClick={() => handleRemoveFromCart(item.id)}>Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;