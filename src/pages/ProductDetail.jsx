import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './ProductDetail.css'

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setProduct(data)
                } else {
                    navigate('/shop')
                }
            } catch (error) {
                console.error('Error fetching product:', error)
                navigate('/shop')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
        window.scrollTo(0, 0)
    }, [id, navigate])

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading product...</div>

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    if (!product) return null

    return (
        <div className="pdp-page">
            <div className="container pdp-container">
                <div className="pdp-grid">
                    {/* Visuals Side */}
                    <div className="pdp-visuals">
                        <ScrollReveal variant="fade-up">
                            <div className="pdp-image-wrap img-placeholder">
                                <img
                                    src={`${product.image}&w=1200&q=90&auto=format`}
                                    alt={product.name}
                                    className="img-reveal"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Content Side */}
                    <div className="pdp-content">
                        <ScrollReveal variant="fade-left">
                            <div className="pdp-header">
                                <span className="pdp-category">{product.category}</span>
                                <h1 className="pdp-title">{product.name}</h1>
                                <p className="pdp-price">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price.replace('$', '')}</p>
                            </div>

                            <div className="pdp-description">
                                <p>A definitive piece from our latest collection, crafted with meticulous attention to detail and premium materials. Designed for those who appreciate the intersection of high-fashion and street culture.</p>
                                <ul className="pdp-features">
                                    <li>Premium technical fabric</li>
                                    <li>Hand-finished detailing</li>
                                    <li>Oversized "Noir" silhouette</li>
                                    <li>Signature gold-tone hardware</li>
                                </ul>
                            </div>

                            <div className="pdp-actions">
                                <div className="pdp-quantity">
                                    <label>Quantity</label>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(-1)} aria-label="Decrease">&minus;</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(1)} aria-label="Increase">+</button>
                                    </div>
                                </div>

                                <button
                                    className="pdp-add-btn"
                                    onClick={() => addToCart(product, quantity)}
                                >
                                    + Add to Cart
                                </button>
                            </div>

                            <div className="pdp-footer">
                                <div className="pdp-benefit">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                    <span>Complimentary Shipping</span>
                                </div>
                                <div className="pdp-benefit">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    <span>Verified Authentic</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
