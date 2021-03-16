import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

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
  }, []);

  console.log(cart);

  return (
    <div>
      <Navbar cartItemsTotal={cart.total_items} />
      {/*<Products products={products} addToCart={handleAddToCart} />*/}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
