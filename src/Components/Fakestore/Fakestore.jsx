import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

function FakestoreApi({ addToCart }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from local storage on component mount
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCartItem(storedCart);
      setCartCount(storedCart.length);
      setTotal(calculateTotal(storedCart));
    }

    // Load categories and products
    loadCategories();
    loadProducts('https://fakestoreapi.com/products');
  }, []);

  // Function to load categories
  function loadCategories() {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(categories => {
        categories.unshift('all');
        setCategories(categories);
      })
      .catch(error => console.error('Error loading categories:', error));
  }

  // Function to load products
  function loadProducts(url) {
    fetch(url)
      .then(res => res.json())
      .then(products => {
        setProducts(products);
      })
      .catch(error => console.error('Error loading products:', error));
  }

  // Function to handle adding a product to cart
  function handleAddtoCart(product) {
    const updatedCart = [...cartItem, product];
    setCartItem(updatedCart);
    setCartCount(updatedCart.length);
    setTotal(calculateTotal(updatedCart));
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to local storage
    alert(`${product.title}\n added to cart`);
  }

  // Function to calculate total price
  function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  // Function to handle viewing cart
  function handleViewCart() {
    navigate('/cart');
  }

  // Function to handle select change
  function handleSelectChange(e) {
    if (e.target.value === 'all') {
      loadProducts('https://fakestoreapi.com/products');
    } else {
      loadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
    }
  }

  return (
    <div>
      <div className='p-2'>
        <header className='d-flex justify-content-between p-3 bg-dark text-white'>
          <div>
            <h3>Shopper.</h3>
          </div>
          <div>
            <span className='me-4'>Home</span>
            <span className='me-4'>Electronic</span>
            <span className='me-4'>Jewellery</span>
            <span className='me-4'>Men's fashion</span>
            <span>Womens Fashion</span>
          </div>
          <div>
            <button className='btn position-relative bg-light' onClick={handleViewCart}>
              <span className='bi bi-cart4'></span>Your cart
              <span className='badge bg-danger rounded-circle position-absolute top-0 right-0'>{cartCount}</span>
            </button>
          </div>
        </header>
        <section className='row'>
          <nav className='col-2'>
            <div>
              <label className='form-label fw-bold'>Select category</label>
              <div>
                <select className='form-select' onChange={handleSelectChange}>
                  {categories.map(ele => (
                    <option key={ele} value={ele}>{ele.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </nav>
          <main className='col-10'>
            <div className=' d-flex flex-wrap overflow-auto' style={{ height: '550px' }}>
              {products.map(product => (
                <div className='card p-2 m-2 ' style={{ width: '180px' }} key={product.id}>
                  <img src={product.image} className='card-img-top' height='140' alt={product.title} />
                  <div className='card-header overflow-auto' style={{ height: '100px' }}>
                    {product.title}
                  </div>
                  <div className='card-body'>
                    <dl>
                      <dt>Price</dt>
                      <dd>${product.price}</dd>
                    </dl>
                  </div>
                  <div className='card-footer'>
                    <button className='btn btn-danger' onClick={() => handleAddtoCart(product)}>
                      <span className='bi bi-cart3'></span>Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}

export default FakestoreApi;
