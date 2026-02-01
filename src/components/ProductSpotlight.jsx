import ScrollReveal from './ScrollReveal'
import './ProductSpotlight.css'

const ProductSpotlight = ({ addToCart }) => {
    const spotlightProduct = {
        id: 1, // Noir Edition Hoodie from our data
        name: 'Noir Edition Hoodie',
        price: '$120.00',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
        category: 'Outerwear',
        specs: [
            '450GSM Heavyweight French Terry',
            'Oversized Drop Shoulder Fit',
            'Double-Lined Structured Hood',
            'Signature Metallic Branding'
        ]
    }

    return (
        <section className="product-spotlight">
            <div className="spotlight-container">
                <ScrollReveal variant="fade-right" className="spotlight-image-side">
                    <img
                        src={`${spotlightProduct.image}&w=1200&q=85&auto=format`}
                        alt={spotlightProduct.name}
                        loading="lazy"
                    />
                    <div className="image-overlay-glow"></div>
                </ScrollReveal>

                <div className="spotlight-content-side">
                    <ScrollReveal variant="fade-left">
                        <div className="spotlight-label">Featured Piece</div>
                        <h2 className="spotlight-title">{spotlightProduct.name}</h2>
                        <p className="spotlight-price">{spotlightProduct.price}</p>
                    </ScrollReveal>

                    <div className="spotlight-specs">
                        <h3>Technical Specifications</h3>
                        <ul>
                            {spotlightProduct.specs.map((spec, index) => (
                                <ScrollReveal key={index} variant="fade-left" delay={0.1 + index * 0.1}>
                                    <li>
                                        <span className="spec-dot"></span>
                                        {spec}
                                    </li>
                                </ScrollReveal>
                            ))}
                        </ul>
                    </div>

                    <ScrollReveal variant="scale-up" delay={0.5}>
                        <button
                            className="spotlight-add-btn"
                            onClick={() => addToCart(spotlightProduct)}
                        >
                            Add to Cart
                        </button>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-up" delay={0.8} className="spotlight-bg-text">
                        NOIR
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}

export default ProductSpotlight
