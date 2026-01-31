import './ProductGrid.css'

const products = [
    {
        id: 1,
        name: 'Noir Edition Hoodie',
        price: '$120.00',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        category: 'Outerwear'
    },
    {
        id: 2,
        name: 'Gold Accent Tee',
        price: '$85.00',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
        category: 'Essentials'
    },
    {
        id: 3,
        name: 'Signature Cap',
        price: '$45.00',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
        category: 'Accessories'
    },
    {
        id: 4,
        name: 'Urban Cargo Pants',
        price: '$150.00',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
        category: 'Bottoms'
    }
]

const ProductGrid = ({ addToCart }) => {
    return (
        <section className="product-section" id="shop">
            <div className="section-header">
                <h2 className="section-title">Latest Drops</h2>
                <div className="section-line"></div>
            </div>

            <div className="grid-container">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="image-wrapper">
                            <img src={product.image} alt={product.name} />
                            <button className="quick-add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductGrid
