import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    return (
        <div className="order-success-page">
            <div className="container success-container">
                <div className="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h1>Order Confirmed!</h1>
                <p>Thank you for your purchase. Your order is being processed.</p>
                <Link to="/shop" className="continue-btn">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
