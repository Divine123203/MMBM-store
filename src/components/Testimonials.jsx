import ScrollReveal from './ScrollReveal'
import './Testimonials.css'

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            quote: "The quality of the French Terry is unmatched. It feels heavy, structured, and premium. Definitely my new go-to hoodie.",
            author: "Marcus V.",
            role: "Verified Collector"
        },
        {
            id: 2,
            quote: "Minimalism done right. No loud logos, just perfect silhouettes and insane attention to detail. Worth every penny.",
            author: "Sarah L.",
            role: "Fashion Consultant"
        },
        {
            id: 3,
            quote: "Finally a brand that understands fit. The oversized cut is exactly what I've been looking for. MMBM is on another level.",
            author: "Jason D.",
            role: "Stylist"
        }
    ]

    return (
        <section className="testimonials">
            <div className="testimonials-container">
                <ScrollReveal>
                    <div className="testimonials-header">
                        <span className="testimonials-tag">Community</span>
                        <h2 className="testimonials-title">The Verdict</h2>
                        <div className="section-divider"></div>
                    </div>
                </ScrollReveal>

                <div className="testimonials-grid">
                    {testimonials.map((t, index) => (
                        <ScrollReveal
                            key={t.id}
                            delay={index * 0.2}
                            variant="fade-up"
                            className="testimonial-card"
                        >
                            <div className="quote-icon">"</div>
                            <p className="testimonial-quote">{t.quote}</p>
                            <div className="testimonial-footer">
                                <span className="testimonial-author">{t.author}</span>
                                <span className="testimonial-role">{t.role}</span>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
