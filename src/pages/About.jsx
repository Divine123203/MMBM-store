import './About.css'

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <span className="hero-tagline">Since 2024</span>
                    <h1 className="hero-title">Beyond the Fabric</h1>
                    <div className="hero-divider"></div>
                </div>
                <div className="hero-bg-overlay"></div>
            </section>

            {/* The Vision Section */}
            <section className="about-vision section-padding">
                <div className="container">
                    <div className="vision-grid">
                        <div className="vision-text">
                            <span className="section-tag">The Philosophy</span>
                            <h2 className="section-title">Minimalism as a Language</h2>
                            <p className="description">
                                MMBM Store was founded on a singular principle: that the most powerful statements are often the quietest. In a world of fleeting trends, we choose the path of permanence. Our designs are not just clothes; they are an extension of the modern individual's identity—sophisticated, intentional, and unapologetically minimal.
                            </p>
                            <p className="description">
                                We strip away the unnecessary to reveal the essential. Every silhouette is a result of meticulous refinement, ensuring that MMBM pieces don't just fit into your life—they elevate it.
                            </p>
                        </div>
                        <div className="vision-image">
                            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" alt="Minimalist Aesthetic" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Section */}
            <section className="about-craft section-padding">
                <div className="container">
                    <div className="craft-header text-center">
                        <span className="section-tag">Craftsmanship</span>
                        <h2 className="section-title">The Art of Detail</h2>
                        <div className="title-divider"></div>
                    </div>

                    <div className="craft-grid">
                        <div className="craft-card">
                            <span className="card-num">01</span>
                            <h3>Material Sourcing</h3>
                            <p>We partner with the finest mills to source heavy-weight French Terrys and premium cottons that provide both structure and unmatched comfort.</p>
                        </div>
                        <div className="craft-card">
                            <span className="card-num">02</span>
                            <h3>Technical Precision</h3>
                            <p>Our patterns are engineered for the perfect "oversized" drop. Every stitch is placed with surgical precision to ensure silhouette integrity over time.</p>
                        </div>
                        <div className="craft-card">
                            <span className="card-num">03</span>
                            <h3>Ethical Focus</h3>
                            <p>Quality also means responsibility. We maintain limited production runs to ensure fair labor practices and reduce environmental impact.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="about-gallery">
                <div className="gallery-grid">
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80" alt="Detail 1" />
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" alt="Detail 2" />
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80" alt="Detail 3" />
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80" alt="Detail 4" />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta section-padding">
                <div className="container text-center">
                    <h2 className="cta-title">Join the Movement</h2>
                    <p className="cta-text">Experience the evolution of contemporary streetwear.</p>
                    <a href="/collections" className="btn-premium">Explore Collections</a>
                </div>
            </section>
        </div>
    )
}

export default About
