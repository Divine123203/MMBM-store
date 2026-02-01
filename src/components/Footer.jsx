import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-col">
                    <h3 className="footer-logo">MMBM</h3>
                    <p>Redefining modern luxury for the digital age.</p>
                </div>

                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        <li><Link to="/collections">New Arrivals</Link></li>
                        <li><Link to="/collections">Best Sellers</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Stay Connected</h4>
                    <div className="social-links">
                        <a href="#" className="social-icon">IG</a>
                        <a href="#" className="social-icon">TW</a>
                        <a href="#" className="social-icon">FB</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 MMBM Store. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
