import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import './Contact.css'

const Contact = () => {
    return (
        <div className="contact-page">
            <header className="contact-hero">
                <div className="container">
                    <ScrollReveal variant="fade-up">
                        <span className="contact-tag">Connection</span>
                        <h1 className="contact-title">Contact The Studio</h1>
                        <p className="contact-subtitle">Expert consultation and client support.</p>
                    </ScrollReveal>
                </div>
            </header>

            <section className="contact-content-section container">
                <div className="contact-grid">
                    <ScrollReveal variant="fade-right" className="contact-info-side">
                        <div className="info-block">
                            <h3>General Inquiries</h3>
                            <p>ebubeonuorahobi@gmail.com</p>
                        </div>
                        <div className="info-block">
                            <h3>Press & Media</h3>
                            <p>press@mmbm.store</p>
                        </div>
                        <div className="info-block">
                            <h3>Flagship Studio</h3>
                            <p>128 Design District<br />Milan, Italy</p>
                        </div>
                        <div className="social-minimal">
                            <a href="#">Instagram</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Twitter</a>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-left" className="contact-form-side">
                        <form className="luxury-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Purpose of Contact</label>
                                <select>
                                    <option>Standard Inquiry</option>
                                    <option>Custom Fitting</option>
                                    <option>Wholesale</option>
                                    <option>Media</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea placeholder="How can we assist you?"></textarea>
                            </div>
                            <button type="submit" className="btn-send">
                                Send Message
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </form>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}

export default Contact
