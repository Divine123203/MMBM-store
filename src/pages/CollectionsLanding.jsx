import { Link } from 'react-router-dom'
import './CollectionsLanding.css'

const CollectionsLanding = () => {
    const collections = [
        {
            id: 1,
            title: 'The Noir Series',
            tagline: 'Deep Shadows, Premium Textiles',
            description: 'A study in darkness and structure. Featuring our 450GSM heavyweight french terry in pitch black.',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
            link: '/shop?category=Outerwear',
            accent: 'Noir'
        },
        {
            id: 2,
            title: 'Essentials Drop',
            tagline: 'The Foundation of Style',
            description: 'Minimalist silhouettes designed for everyday elegance. High-grade cotton meets architectural fit.',
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
            link: '/shop?category=Essentials',
            accent: 'Core'
        },
        {
            id: 3,
            title: 'Indigo Raw Denim',
            tagline: 'Timeless Construction',
            description: 'Honoring the heritage of denim. Raw indigos and slim silhouettes that age with your journey.',
            image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=1200&q=80',
            link: '/shop?category=Jeans',
            accent: 'Indigo'
        }
    ]

    return (
        <div className="collections-landing">
            <header className="collections-header-section">
                <div className="container">
                    <span className="page-tag">Editorial</span>
                    <h1 className="page-title">Curated Drops</h1>
                    <p className="page-intro">Explore the narratives behind our most iconic series.</p>
                </div>
            </header>

            <section className="collections-story-list">
                {collections.map((col, index) => (
                    <div key={col.id} className={`collection-story-item ${index % 2 === 1 ? 'reverse' : ''}`}>
                        <div className="story-image">
                            <img src={`${col.image}&w=1200&q=80&auto=format`} alt={col.title} loading="lazy" />
                            <div className="image-accent-text">{col.accent}</div>
                        </div>
                        <div className="story-content">
                            <span className="story-tag">{col.tagline}</span>
                            <h2 className="story-title">{col.title}</h2>
                            <p className="story-description">{col.description}</p>
                            <Link to={col.link} className="btn-explore-drop">
                                Explore Collection
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            <section className="collections-footer-cta">
                <div className="container text-center">
                    <h2>View All Pieces</h2>
                    <p>Browse the complete MMBM catalog.</p>
                    <Link to="/shop" className="btn-vault">Enter The Shop</Link>
                </div>
            </section>
        </div>
    )
}

export default CollectionsLanding
