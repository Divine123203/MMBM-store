import { useRef, useEffect } from 'react'
import './CartDrawer.css'

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart, updateQuantity }) => {
    const drawerRef = useRef(null)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = typeof item.price === 'string'
                ? parseFloat(item.price.replace('$', ''))
                : item.price
            return total + (price * item.quantity)
        }, 0).toFixed(2)
    }

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`} ref={drawerRef}>
                <div className="cart-header">
                    <h2>Your Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your bag is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">{typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}</p>

                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="remove-btn"
                                    aria-label="Remove item"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="total-row">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => {
                            onClose();
                            window.location.href = '/checkout';
                        }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartDrawer
