import { Link } from 'react-router-dom'
import './FeaturedCategories.css'

const categories = [
    {
        id: 1,
        title: 'Essential Tees',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        link: '/collections?category=Essentials',
        size: 'large'
    },
    {
        id: 2,
        title: 'Premium Outerwear',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aec369a79?auto=format&fit=crop&w=800&q=80',
        link: '/collections?category=Outerwear',
        size: 'small'
    },
    {
        id: 3,
        title: 'Signature Accessories',
        image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80',
        link: '/collections?category=Accessories',
        size: 'small'
    }
]

const FeaturedCategories = () => {
    return (
        <section className="featured-categories">
            <div className="section-header">
                <h2>Explore Collections</h2>
                <div className="divider"></div>
            </div>

            <div className="categories-grid">
                {categories.map((category) => (
                    <Link
                        to={category.link}
                        key={category.id}
                        className={`category-card ${category.size}`}
                    >
                        <div className="card-image">
                            <img src={category.image} alt={category.title} />
                            <div className="overlay"></div>
                        </div>
                        <div className="card-content">
                            <h3>{category.title}</h3>
                            <span className="shop-link">Shop Collection</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FeaturedCategories
