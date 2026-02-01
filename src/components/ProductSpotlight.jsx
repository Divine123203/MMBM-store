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
                <div className="spotlight-image-side">
                    <img src={spotlightProduct.image} alt={spotlightProduct.name} />
                    <div className="image-overlay-glow"></div>
                </div>

                <div className="spotlight-content-side">
                    <div className="spotlight-label">Featured Piece</div>
                    <h2 className="spotlight-title">{spotlightProduct.name}</h2>
                    <p className="spotlight-price">{spotlightProduct.price}</p>

                    <div className="spotlight-specs">
                        <h3>Technical Specifications</h3>
                        <ul>
                            {spotlightProduct.specs.map((spec, index) => (
                                <li key={index}>
                                    <span className="spec-dot"></span>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="spotlight-add-btn"
                        onClick={() => addToCart(spotlightProduct)}
                    >
                        Add to Cart
                    </button>

                    <div className="spotlight-bg-text">NOIR</div>
                </div>
            </div>
        </section>
    )
}

export default ProductSpotlight
