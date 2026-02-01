import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Shop.css'

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

const Shop = ({ addToCart }) => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchParams, setSearchParams] = useSearchParams()

    // Check for both 'category' and 'q' from URL
    const queryParam = searchParams.get('q') || ''
    const categoryParam = searchParams.get('category')

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam)
        } else {
            setSelectedCategory('All')
        }
    }, [categoryParam])

    const [searchQuery, setSearchQuery] = useState(queryParam)

    useEffect(() => {
        setSearchQuery(queryParam)
    }, [queryParam])

    const handleSearchChange = (e) => {
        const val = e.target.value
        setSearchQuery(val)
        const params = {}
        if (val) params.q = val
        if (selectedCategory !== 'All') params.category = selectedCategory
        setSearchParams(params)
    }

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="collections-page">
            <div className="collections-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <span className="hero-tag">The Boutique</span>
                    <h1 className="hero-title">Selected Collections</h1>
                    <div className="hero-divider"></div>
                </div>
            </div>

            <div className="shop-interface">
                <div className="filters-bar">
                    <div className="container">
                        <div className="filters-inner">
                            <div className="category-scroll">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedCategory(category)
                                            const params = {}
                                            if (searchQuery) params.q = searchQuery
                                            if (category !== 'All') params.category = category
                                            setSearchParams(params)
                                        }}
                                    >
                                        {category}
                                        {selectedCategory === category && <span className="tab-indicator"></span>}
                                    </button>
                                ))}
                            </div>

                            <div className="search-minimal">
                                <input
                                    type="text"
                                    placeholder="Find your style..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products-section container">
                    <div className="results-count">
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="luxury-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="premium-card">
                                    <div className="card-image-area">
                                        <img
                                            src={`${product.image}&w=600&q=80&auto=format`}
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                        <div className="card-actions">
                                            <button className="btn-quick-add" onClick={() => addToCart(product)}>
                                                <span>Add to Cart</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-meta">
                                            <span className="card-cat">{product.category}</span>
                                            <span className="card-price">{product.price}</span>
                                        </div>
                                        <h3 className="card-title">{product.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No items found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shop
