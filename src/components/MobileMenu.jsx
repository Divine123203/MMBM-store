import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './MobileMenu.css'

const MobileMenu = ({ isOpen, onClose, userInfo, handleLogout }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleNavigation = (path) => {
        navigate(path)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="mobile-menu-overlay" onClick={onClose}>
            <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>

                {/* Header Section */}
                <div className="menu-header">
                    <div className="menu-header-content">
                        <div className="menu-logo">MMBM</div>
                        <p className="menu-tagline">Luxury Redefined</p>
                    </div>
                    {/* Decorative blurred circle or gradient could go here via CSS */}
                </div>

                {/* Scrollable Content */}
                <div className="menu-scroll-content">

                    {/* Navigation Items */}
                    <div className="menu-items">
                        <div className="menu-item" onClick={() => handleNavigation('/')}>
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </div>
                            <div className="menu-text">
                                <span className="menu-title">Home</span>
                                <span className="menu-subtitle">Welcome to MMBM</span>
                            </div>
                        </div>

                        <div className="menu-item" onClick={() => handleNavigation('/shop')}>
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            </div>
                            <div className="menu-text">
                                <span className="menu-title">Shop</span>
                                <span className="menu-subtitle">Browse our collection</span>
                            </div>
                        </div>

                        <div className="menu-item" onClick={() => handleNavigation('/collections')}>
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            </div>
                            <div className="menu-text">
                                <span className="menu-title">Collections</span>
                                <span className="menu-subtitle">Curated for you</span>
                            </div>
                        </div>

                        <div className="menu-item" onClick={() => handleNavigation('/about')}>
                            <div className="menu-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            </div>
                            <div className="menu-text">
                                <span className="menu-title">About</span>
                                <span className="menu-subtitle">Our story & vision</span>
                            </div>
                        </div>

                        {userInfo && userInfo.isAdmin && (
                            <div className="menu-item" onClick={() => handleNavigation('/admin')}>
                                <div className="menu-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                </div>
                                <div className="menu-text">
                                    <span className="menu-title">Admin</span>
                                    <span className="menu-subtitle">Dashboard</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA Section */}
                    <div className="menu-footer">
                        {userInfo ? (
                            <div className="user-section">
                                <div className="user-greeting">
                                    Hello, {userInfo.name.split(' ')[0]}
                                </div>
                                <button className="menu-cta-btn secondary" onClick={() => { handleLogout(); onClose(); }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button className="menu-cta-btn primary" onClick={() => handleNavigation('/login')}>
                                Login / Sign Up
                            </button>
                        )}

                        <div className="legal-links">
                            <span onClick={() => handleNavigation('/privacy')}>Privacy Policy</span>
                            <span onClick={() => handleNavigation('/terms')}>Terms & Conditions</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MobileMenu
