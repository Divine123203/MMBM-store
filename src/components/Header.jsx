import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ cartCount, toggleCart }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="header">
            <div className="logo">MMBM</div>

            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
            </button>

            <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/collections" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
                    <li><Link to="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link></li>
                    <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                </ul>
            </nav>
            <div className="actions">
                <button className="icon-btn search-btn" aria-label="Search">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
                <button className="icon-btn cart-btn" aria-label="Cart" onClick={toggleCart}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>
            </div>
        </header>
    )
}

export default Header
