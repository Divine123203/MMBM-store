import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import './Header.css'

const Header = ({ cartCount, toggleCart, userInfo, setUserInfo }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const searchInputRef = useRef(null)

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        setUserInfo(null)
        navigate('/login')
    }

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
            navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsSearchOpen(false)
        }
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') setIsSearchOpen(false)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo" onClick={() => navigate('/')}>MMBM</div>

                <nav className={`nav`}>
                    <ul className="nav-links">
                        <li style={{ "--i": 1 }}><Link to="/">Home</Link></li>
                        <li style={{ "--i": 2 }}><Link to="/shop">Shop</Link></li>
                        <li style={{ "--i": 3 }}><Link to="/collections">Collections</Link></li>
                        <li style={{ "--i": 4 }}><Link to="/about">About</Link></li>
                        {userInfo && userInfo.isAdmin && (
                            <li style={{ "--i": 5 }}><Link to="/admin" className="admin-nav-link">Admin</Link></li>
                        )}
                        {userInfo ? (
                            <li style={{ "--i": 5 }}>
                                <div className="user-nav-item">
                                    <span className="user-name">Hi, {userInfo.name.split(' ')[0]}</span>
                                    <button className="logout-link" onClick={handleLogout}>Logout</button>
                                </div>
                            </li>
                        ) : (
                            <li style={{ "--i": 5 }}><Link to="/login">Login</Link></li>
                        )}
                    </ul>
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

                    {userInfo && (
                        <button className="icon-btn cart-btn" aria-label="Cart" onClick={toggleCart}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>
                    )}

                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
                    </button>
                </div>
            </div>
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                userInfo={userInfo}
                handleLogout={handleLogout}
            />
        </header>
    )
}

export default Header
