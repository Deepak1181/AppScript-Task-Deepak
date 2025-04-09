'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './navbar.css'; // Add this CSS file

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <nav>
          <header className="navbar">
            
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>

            
            <div className="logo">LOGO</div>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/contactus">Contact</Link>
              <Link href="/skills">Skills</Link>
              
            </nav>

           
            <div className="icons">
              <span>🔍</span>
              <span>🤍</span>
              <span>🛒</span>
              <span>👤</span>
              <select>
                <option>ENG</option>
                <option>Hindi</option>
              </select>
            </div>
          </header>
        </nav>
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}
