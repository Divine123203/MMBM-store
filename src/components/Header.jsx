import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ cartCount, toggleCart }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const searchInputRef = useRef(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/collections?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsSearchOpen(false)
        }
    }

    // Close search on escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') setIsSearchOpen(false)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>MMBM</div>

            <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobile-nav-header">
                    <div className="logo">MMBM</div>
                    <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <ul className="nav-links">
                    <li style={{ "--i": 1 }}><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li style={{ "--i": 2 }}><Link to="/collections" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
                    <li style={{ "--i": 3 }}><Link to="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link></li>
                    <li style={{ "--i": 4 }}><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                </ul>

                <div className="mobile-nav-footer">
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.15-3 3.5c0 0-2 1-4 1.5s-4 .5-6 0-4-1.5-4-1.5S3 4 3 4s1 2 1 4-1 4-1 4 2 2 4 2 4-1 4-1 1 3 4 4 5-1 5-1 1 2 1 2z"></path></svg></a>
                        <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                    </div>
                    <div className="store-info">
                        <p>Lagos, Nigeria</p>
                        <p>support@mmbmstore.com</p>
                    </div>
                </div>
            </nav>

            <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
                <form onSubmit={handleSearch}>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </form>
                <button className="search-close" onClick={() => setIsSearchOpen(false)}>×</button>
            </div>

            <div className="header-actions">
                <button className="icon-btn search-btn" aria-label="Search" onClick={toggleSearch}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
                <button className="icon-btn cart-btn" aria-label="Cart" onClick={toggleCart}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                </button>
            </div>
        </header>
    )
}

export default Header
