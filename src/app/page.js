


'use client';

import React, { useEffect, useState } from 'react';
import './products.css';

const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customizable, setCustomizable] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');


  useEffect(() => {
    fetchProducts();
  }, []);

  
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, customizable, priceRange,selectedRating]);

  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
    setFilteredProducts(data);
    const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
    setCategories(uniqueCategories);
  };

 


  const filterProducts = () => {
    let updated = [...products];
  
    if (selectedCategory !== 'All') {
      updated = updated.filter(product => product.category === selectedCategory);
    }
  
    if (customizable) {
      updated = updated.filter(product => product.id % 2 === 0);
    }
  
    if (priceRange !== '') {
      const [min, max] = priceRange.split('-').map(Number);
      updated = updated.filter(product =>
        max ? product.price >= min && product.price <= max : product.price >= min
      );
    }
  
    if (selectedRating !== '') {
      updated = updated.filter(product => product.rating?.rate >= Number(selectedRating));
    }
  
    setFilteredProducts(updated);
  };
  
  return (
    <div>
      <section className="hero">
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
          scelerisque...
        </p>
      </section>

      <div className="container">

       
        <button className="filter-toggle" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

      
        <aside className={`sidebar ${showMobileFilters ? 'show' : ''}`}>

        <div className="product-count">
  Total {filteredProducts.length} products
</div>
          <h3>Filter</h3>
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={customizable}
                onChange={e => setCustomizable(e.target.checked)}
              />
              Customizable
            </label>
          </div>

          <div className="filter-group">
  <label htmlFor="price">Price Range</label>
  <select
    id="price"
    value={priceRange}
    onChange={e => setPriceRange(e.target.value)}
  >
    <option value="">All</option>
    <option value="0-20">0$ - 20$</option>
    <option value="20-50">20$ - 50$</option>
    <option value="50-100">50$ - 100$</option>
    <option value="100-1000">100$ and more</option>
  </select>
</div>


<div className="filter-group">
  <label htmlFor="rating">Minimum Rating</label>
  <select
    id="rating"
    value={selectedRating}
    onChange={e => setSelectedRating(e.target.value)}
  >
    <option value="">All</option>
    <option value="1">1 ★ </option>
    <option value="2">2 ★★ </option>
    <option value="3">3 ★★★ </option>
    <option value="4">4 ★★★★ </option>
    <option value="5">5 ★★★★★</option>
  </select>
</div>

        </aside>

       
        <main className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <p>Rating: {product.rating?.rate} ★</p>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
