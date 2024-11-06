import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems, removeFromCart, updateCartItemQuantity, fetchProductById } from '../../services/api';
import '../../Style/product.css';
import { AuthContext } from '../../Context/AuthProvider';
import { createOrder } from '../../services/api'; 

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCartItemsFromAPI();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  const fetchCartItemsFromAPI = async () => {
    try {
      const response = await fetchCartItems(user.user_id); 
      setCartItems(response.data);
      setCartItemCount(response.data.length);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const productIds = cartItems.map(item => item.product);
      const productRequests = productIds.map(id => fetchProductById(id));
      const productResponses = await Promise.all(productRequests);
      const productsData = productResponses.map(response => response.data);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id, user.user_id); 
      fetchCartItemsFromAPI();
      alert('Product successfully removed from your cart.');
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart.');
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      await updateCartItemQuantity(id, quantity, user.user_id); 
      fetchCartItemsFromAPI();
      alert('Quantity is updated');
      window.location.reload();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity.');
    }
  };

  const handleBuy = async () => {
    try {
      const orderPromises = cartItems.map(item =>
        createOrder({
          user: user.user_id,
          product: item.product,
          quantity: item.quantity
        })
      );

      await Promise.all(orderPromises);
      alert('Buy successful!');
      const cartItemIds = cartItems.map(item => item.id);
      await Promise.all(cartItemIds.map(id => removeFromCart(id, user.user_id)));
      setCartItemCount(0);
      alert('product is removed from your cart succesfully!');
      window.location.reload();
      // fetchCartItemsFromAPI();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to complete the purchase.');
    }
  };

  const renderCartItems = () => {
    const groupedItems = {};

    // Group items by product ID
    cartItems.forEach(item => {
      if (!groupedItems[item.product]) {
        groupedItems[item.product] = { ...item };
      } else {
        groupedItems[item.product].quantity += item.quantity;
      }
    });

    // Render grouped items
    return Object.values(groupedItems).map(item => {
      const product = products.find(p => p.id === item.product);
      if (!product) return null;

      return (
        <div key={item.id} className="card mb-3 small-card">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={product.photo ? product.photo : "/static/default_product_image.jpg"}
                className="img-fluid rounded-start small-card-img"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <div className="btn-group" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button type="button" className="btn btn-light" disabled>
                    {item.quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.product);
      return product ? total + (product.price * item.quantity) : total;
    }, 0);
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/home')}>
        Back to Home
      </button>
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/home')}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {renderCartItems()}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Order Details:</h2>
                <div className="Bag">
                  <h4>Bag Total: ${calculateTotalPrice().toFixed(2)}</h4>
                </div>
                <button className="btn btn-dark" onClick={handleBuy}>Buy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


