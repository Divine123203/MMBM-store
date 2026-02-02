import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../config'
import './Shop.css'
import { allProducts } from '../data/products'

const Shop = ({ addToCart }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchParams, setSearchParams] = useSearchParams()

    const queryParam = searchParams.get('q') || ''
    const categoryParam = searchParams.get('category')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/products`)
                if (!response.ok) throw new Error('Server offline')
                const data = await response.json()
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.warn('Using local data fallback:', error)
                setProducts(allProducts)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

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

    const categories = ['All', ...new Set(products.map(p => p.category))]

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading collections...</div>

    return (
        <div className="shop-page">
            {/* Shop Hero Banner */}
            <header className="shop-hero-banner">
                <div className="banner-bg-overlay"></div>
                <div className="container banner-content">
                    <h1 className="banner-title">SELECTED COLLECTIONS</h1>
                    <div className="banner-accent"></div>
                </div>
            </header>

            {/* Filter Navigation */}
            <div className="shop-nav">
                <div className="container">
                    <div className="shop-nav-inner">
                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(category)
                                        const params = {}
                                        if (searchQuery) params.q = searchQuery
                                        if (category !== 'All') params.category = category
                                        setSearchParams(params)
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="shop-search">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input
                                type="text"
                                placeholder="Find your style..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Display */}
            <div className="shop-content container">
                {filteredProducts.length > 0 ? (
                    <div className="shop-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-item">
                                <div className="product-image-container">
                                    <Link to={`/product/${product.id}`} className="product-link">
                                        <div className="image-overlay"></div>
                                        <img
                                            src={`${product.image}&w=800&q=85&auto=format`}
                                            alt={product.name}
                                            className="product-image img-reveal"
                                            onLoad={(e) => e.target.classList.add('loaded')}
                                        />
                                    </Link>
                                    <button
                                        className="bag-cta"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                    >
                                        + Add to Cart
                                    </button>
                                </div>

                                <div className="product-details">
                                    <Link to={`/product/${product.id}`} className="product-text-link">
                                        <div className="product-meta-row">
                                            <span className="product-tag">{product.category}</span>
                                            <span className="product-price-val">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price.replace('$', '')}</span>
                                        </div>
                                        <h3 className="product-display-name">{product.name}</h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-shop">
                        <h3>No pieces found</h3>
                        <p>Refine your search or explore other categories.</p>
                        <button onClick={() => setSelectedCategory('All')} className="reset-btn">View All</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shop
