import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Collections.css'

// Extended mock data
const allProducts = [
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
    },
    {
        id: 5,
        name: 'Distressed Denim Jacket',
        price: '$140.00',
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=600&q=80',
        category: 'Outerwear'
    },
    {
        id: 6,
        name: 'Classic Blue Jeans',
        price: '$95.00',
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=600&q=80',
        category: 'Jeans'
    },
    {
        id: 7,
        name: 'Graphic Print Shirt',
        price: '$60.00',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
        category: 'Shirts'
    },
    {
        id: 8,
        name: 'Slim Fit Black Jeans',
        price: '$100.00',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
        category: 'Jeans'
    },
    {
        id: 9,
        name: 'Oversized Beige Hoodie',
        price: '$130.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
        category: 'Outerwear'
    },
    {
        id: 10,
        name: 'Casual Checkered Shirt',
        price: '$70.00',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
        category: 'Shirts'
    }
]

const categories = ['All', 'Outerwear', 'Jeans', 'Shirts', 'Bottoms', 'Essentials', 'Accessories']

const Collections = ({ addToCart }) => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="collections-page">
            <div className="collections-header">
                <h1>Our Collections</h1>
                <p>Curated styles for the modern individual.</p>
            </div>

            <div className="filters-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
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
                    ))
                ) : (
                    <div className="no-results">
                        <p>No items found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Collections
