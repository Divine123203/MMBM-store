import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './Checkout.css';
import { API_BASE_URL } from '../config';

// Replace with your publishable key
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
    console.error("Stripe Publishable Key is missing in .env file (VITE_STRIPE_PUBLISHABLE_KEY)");
}
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/order-success',
            },
            redirect: 'if_required'
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment Status: ' + paymentIntent.status);
            // Redirect or show success
            window.location.href = '/order-success';
        } else {
            setMessage('Unexpected state.');
        }


        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit" className="pay-btn">
                <span id="button-text">
                    {isProcessing ? "Processing Payment..." : `Pay Now $${amount.toFixed(2)}`}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

const Checkout = ({ cart }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(() => {
        const saved = localStorage.getItem('userInfo');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=checkout');
        }
    }, [userInfo, navigate]);

    const [clientSecret, setClientSecret] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailBlur = (e) => {
        const email = e.target.value;
        if (email && !validateEmail(email)) {
            setEmailError('Please enter a complete email address (e.g. name@example.com)');
        } else {
            setEmailError('');
        }
    };

    const parsePrice = (price) => {
        if (typeof price === 'string') {
            return parseFloat(price.replace('$', ''));
        }
        return price;
    };

    const totalAmount = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

    useEffect(() => {
        if (totalAmount > 0) {
            // Create PaymentIntent as soon as the page loads
            fetch(`${API_BASE_URL}/api/payment/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error("Backend Error:", data.error);
                        alert("Payment initialization failed: " + data.error);
                    } else {
                        setClientSecret(data.clientSecret);
                    }
                })
                .catch((err) => console.error("Network Error:", err));
        }
    }, [totalAmount]);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#cca43b',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
                    <h2>Your cart is empty</h2>
                    <p style={{ margin: '20px 0', color: '#888' }}>Looks like you haven't added any items yet.</p>
                    <button
                        onClick={() => window.location.href = '/shop'}
                        className="pay-btn"
                        style={{ maxWidth: '200px', margin: '0 auto' }}
                    >
                        Return to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container checkout-container">
                <h1 className="checkout-page-title">Secure Checkout</h1>
                <div className="checkout-grid">
                    {/* Left Column: Shipping & Payment */}
                    <div className="checkout-form-section">
                        <h2>Shipping Information</h2>
                        <form className="shipping-form">
                            <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
                            <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required
                            />
                            <div className="form-row">
                                <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
                                <input type="text" name="zip" placeholder="ZIP / Postal Code" onChange={handleInputChange} required />
                            </div>
                        </form>

                        <h2>Payment Method</h2>
                        <div className="payment-toggle">
                            <button
                                className={`toggle-btn ${paymentMethod === 'stripe' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('stripe')}
                            >
                                Credit Card
                            </button>
                            <button
                                className={`toggle-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                PayPal
                            </button>
                        </div>

                        <div className="payment-gateway-container">
                            {paymentMethod === 'stripe' && clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm amount={totalAmount} />
                                </Elements>
                            )}
                            {paymentMethod === 'paypal' && (
                                <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: totalAmount.toFixed(2),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                alert("Transaction completed by " + details.payer.name.given_name);
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <ul className="summary-items">
                            {cart.map(item => (
                                <li key={item.id} className="summary-item">
                                    <div className="summary-item-info">
                                        <span className="summary-item-name">{item.name}</span>
                                        <span className="summary-item-qty">x{item.quantity}</span>
                                    </div>
                                    <span className="summary-item-price">${(parsePrice(item.price) * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
