import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Products, Navbar, Cart, Checkout } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (id, amount) => {
    const item = await commerce.cart.add(id, amount);
    setCart(item.cart);
  };

  const handleUpdateCartQnty = async (id, quantity) => {
    const response = await commerce.cart.update(id, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (id) => {
    const response = await commerce.cart.remove(id);
    setCart(response.cart);
  };

  const handleEmptyAllCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar cartItemsTotal={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart}
              onUpdateCartQnty={handleUpdateCartQnty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyAllCart={handleEmptyAllCart}
            />
          </Route>
          <Route path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
