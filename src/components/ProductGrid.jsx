import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import './ProductGrid.css'

const ProductGrid = ({ addToCart }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products')
                const data = await response.json()
                setProducts(data.slice(0, 4))
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }
        fetchProducts()
    }, [])
    return (
        <section className="home-shop-section" id="shop">
            <ScrollReveal>
                <div className="home-shop-header">
                    <h2 className="home-shop-title">Latest Arrivals</h2>
                    <div className="home-shop-accent"></div>
                </div>
            </ScrollReveal>

            <div className="home-shop-grid">
                {products.map((product, index) => (
                    <ScrollReveal
                        key={product.id}
                        delay={index * 0.1}
                        variant="fade-up"
                        className="home-shop-item"
                    >
                        <div className="item-visuals">
                            <Link to={`/product/${product.id}`} className="item-link">
                                <img
                                    src={`${product.image}&w=600&q=80&auto=format`}
                                    alt={product.name}
                                    loading="lazy"
                                    className="item-img img-reveal"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                />
                            </Link>
                            <button
                                className="item-cta"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product);
                                }}
                            >
                                + Add to Cart
                            </button>
                        </div>
                        <div className="item-info">
                            <Link to={`/product/${product.id}`} className="item-text-link">
                                <div className="item-meta">
                                    <span className="item-cat">{product.category}</span>
                                    <span className="item-price">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price.replace('$', '')}</span>
                                </div>
                                <h3 className="item-name">{product.name}</h3>
                            </Link>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default ProductGrid
