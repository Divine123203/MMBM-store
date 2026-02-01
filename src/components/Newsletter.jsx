import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import './Newsletter.css'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        // Simulate API call
        setTimeout(() => {
            setStatus('success')
            setEmail('')
        }, 1500)
    }

    return (
        <section className="newsletter">
            <div className="newsletter-container">
                <ScrollReveal variant="scale-up" className="newsletter-box">
                    <div className="newsletter-header">
                        <span className="newsletter-tag">Exclusive Access</span>
                        <h2 className="newsletter-title">Join The Vault</h2>
                        <p className="newsletter-subtitle">
                            Be the first to know about new drops, secret collections, and VIP-only events.
                        </p>
                    </div>

                    {status === 'success' ? (
                        <div className="newsletter-success">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>You're in. Welcome to the Vault.</span>
                        </div>
                    ) : (
                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === 'loading'}
                                />
                                <button type="submit" className="newsletter-btn" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Joining...' : 'Join Now'}
                                </button>
                            </div>
                            <p className="privacy-note">By joining, you agree to our privacy policy.</p>
                        </form>
                    )}
                </ScrollReveal>
            </div>
            <div className="vault-bg-accent"></div>
        </section>
    )
}

export default Newsletter
