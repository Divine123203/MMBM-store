import './BrandStory.css'

const BrandStory = () => {
    return (
        <section className="brand-story">
            <div className="brand-story-container">
                <div className="brand-story-content">
                    <span className="brand-story-tagline">Crafting the Future</span>
                    <h2 className="brand-story-title">The Essence of MMBM</h2>
                    <div className="brand-story-divider"></div>
                    <p className="brand-story-description">
                        At MMBM Store, we believe that fashion is more than just clothing; it's a silent language of confidence and identity. Born from a vision of contemporary minimalism and timeless silhouettes, our collections are meticulously crafted for the modern individual who values both form and function.
                    </p>
                    <p className="brand-story-description">
                        Every piece tells a story of quality, from the selection of premium fabrics to the precision of every stitch. We are committed to a philosophy of "less but better," creating essentials that adapt to your lifestyle and stand the test of time.
                    </p>
                    <div className="brand-story-stats">
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Premium Fabrics</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Style Versatility</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">01</span>
                            <span className="stat-label">Vision: Excellence</span>
                        </div>
                    </div>
                </div>
                <div className="brand-story-image">
                    <div className="image-stack">
                        <div className="image-main">
                            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80" alt="Brand Vision" />
                        </div>
                        <div className="image-secondary">
                            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80" alt="Detailing" />
                        </div>
                    </div>
                    <div className="glass-accent"></div>
                </div>
            </div>
        </section>
    )
}

export default BrandStory
