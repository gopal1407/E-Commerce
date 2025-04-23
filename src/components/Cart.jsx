import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from '../features/cart/cartSlice';
import { Button, Table, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => {
    console.log('Cart Items:', state.cart.items);
    return state.cart.items;
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cartItems');
    setCheckoutComplete(true);
  };

  useEffect(() => {
    if (checkoutComplete) {
      const timer = setTimeout(() => {
        setCheckoutComplete(false);
        navigate('/');
      }, 3000); // Auto-redirect in 3 sec
      return () => clearTimeout(timer);
    }
  }, [checkoutComplete, navigate]);

  return (
    <div>
      <h2>Your Shopping Cart</h2>

      {checkoutComplete && (
        <Alert variant="success" className="mt-3">
          🎉 Thank you for your purchase! Redirecting to Home...
        </Alert>
      )}

      {cartItems.length === 0 && !checkoutComplete ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <Image src={item.image} height={50} style={{ objectFit: 'contain' }} />
                  </td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      disabled={item.quantity === 1}
                    >
                      −
                    </Button>{' '}
                    {item.quantity}{' '}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </Button>
                  </td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-4">
            <h5>Total Items: {totalQuantity}</h5>
            <h5>Total Price: ${totalPrice}</h5>
          </div>

          <Button
            variant="success"
            className="mt-3"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
