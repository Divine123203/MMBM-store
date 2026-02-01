import ScrollReveal from './ScrollReveal'
import './BrandStory.css'

const BrandStory = () => {
    return (
        <section className="brand-story">
            <div className="brand-story-container">
                <div className="brand-story-content">
                    <ScrollReveal variant="fade-right">
                        <span className="brand-story-tagline">Crafting the Future</span>
                        <h2 className="brand-story-title">The Essence of MMBM</h2>
                        <div className="brand-story-divider"></div>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-up" delay={0.2}>
                        <p className="brand-story-description">
                            At MMBM Store, we believe that fashion is more than just clothing; it's a silent language of confidence and identity. Born from a vision of contemporary minimalism and timeless silhouettes, our collections are meticulously crafted for the modern individual who values both form and function.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-up" delay={0.4}>
                        <p className="brand-story-description">
                            Every piece tells a story of quality, from the selection of premium fabrics to the precision of every stitch. We are committed to a philosophy of "less but better," creating essentials that adapt to your lifestyle and stand the test of time.
                        </p>
                    </ScrollReveal>

                    <div className="brand-story-stats">
                        {[
                            { num: '100%', label: 'Premium Fabrics' },
                            { num: '24/7', label: 'Style Versatility' },
                            { num: '01', label: 'Vision: Excellence' }
                        ].map((stat, index) => (
                            <ScrollReveal key={index} variant="scale-up" delay={0.6 + index * 0.1}>
                                <div className="stat-item">
                                    <span className="stat-number">{stat.num}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <ScrollReveal variant="fade-left" className="brand-story-image">
                    <div className="image-stack">
                        <div className="image-main">
                            <img
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
                                alt="Brand Vision"
                                loading="lazy"
                            />
                        </div>
                        <ScrollReveal variant="scale-up" delay={0.5} className="image-secondary">
                            <img
                                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"
                                alt="Detailing"
                                loading="lazy"
                            />
                        </ScrollReveal>
                    </div>
                    <div className="glass-accent"></div>
                </ScrollReveal>
            </div>
        </section>
    )
}

export default BrandStory
