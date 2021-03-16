import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Products, Navbar, Cart } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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

  useEffect(() => {
    fetchProducts();
    fetchCart();
    console.log('useAffect');
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
            <Cart cart={cart} fetchCart={fetchCart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
