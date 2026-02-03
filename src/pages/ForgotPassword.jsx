import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { API_BASE_URL } from '../config'
import './Login.css' // Reusing the high-fashion login styles

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showReset, setShowReset] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSendCode = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (res.ok) {
                setShowReset(true)
                alert('Reset code sent to your email!')
            } else {
                alert(data.message || 'Failed to send reset code')
            }
        } catch (err) {
            alert('Something went wrong. Is the server running?')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code, password: newPassword }),
            })
            const data = await res.json()
            if (res.ok) {
                alert('Password reset successful! You can now log in.')
                navigate('/login')
            } else {
                alert(data.message || 'Reset failed')
            }
        } catch (err) {
            alert('Something went wrong. Reset failed.')
        } finally {
            setIsLoading(false)
        }
    }

    const socialIcons = {
        google: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92V8.51h7.84c.12.56.16 1.12.16 1.8 0 4.76-3.2 8.12-8 8.12-4.42 0-8-3.58-8-8s3.58-8 8-8c2.16 0 3.96.79 5.36 2.1l-3.08 3.08c-.84-.8-2.04-1.28-3.48-1.28-2.6 0-4.72 2.12-4.72 4.72s2.12 4.72 4.72 4.72c2.4 0 4.28-1.52 4.68-3.6h-4.68z" />
            </svg>
        ),
        apple: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.96.95-2.02 1.95-3.32 1.95s-1.87-.77-3.42-.77-2.12.77-3.42.77c-1.3 0-2.36-1-3.32-1.95-4.14-4.15-4.14-10.86 0-15.01 1.05-1.05 2.11-1.64 3.32-1.64 1.3 0 2.12.77 3.42.77s2.12-.77 3.42-.77c1.3 0 2.36.59 3.32 1.64 3 2.99 3 7.8 0 10.79zM10.3 4.22c0-1.25.59-2.36 1.64-3.32 1.05-1.05 2.12-1.25 3.32-1.25.1 1.3-.59 2.36-1.64 3.32-1.05 1.05-2.12 1.25-3.32 1.25z" />
            </svg>
        ),
        facebook: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
        )
    }

    return (
        <div className="login-page fashion-editorial">
            <div className="login-split">
                <motion.div
                    className="login-visual"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="/assets/images/login-fashion.png"
                        alt="High Fashion Editorial"
                        className="fashion-asset"
                    />
                    <div className="visual-overlay"></div>
                </motion.div>

                <div className="login-form-side">
                    <nav className="login-nav">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/login">Sign In</Link>
                    </nav>

                    <div className="form-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={showReset ? "reset" : "forgot"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="form-content"
                            >
                                <h1 className="form-greeting">
                                    {showReset ? 'Set New Password' : 'Reset Your Password'}
                                </h1>

                                {!showReset ? (
                                    <form className="pill-form" onSubmit={handleSendCode}>
                                        <p className="verify-instruction" style={{ marginBottom: '1.5rem', color: '#888' }}>
                                            Enter the email associated with your account and we'll send you a 6-digit code.
                                        </p>
                                        <div className="pill-input-wrap">
                                            <input
                                                type="email"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <span className="input-icon">@</span>
                                        </div>

                                        <button type="submit" className="btn-pill-submit" disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'Send Reset Code'}
                                        </button>
                                    </form>
                                ) : (
                                    <form className="pill-form" onSubmit={handleResetPassword}>
                                        <p className="verify-instruction" style={{ marginBottom: '1.5rem', color: '#888' }}>
                                            Enter the 6-digit code sent to your email and choose a new password.
                                        </p>
                                        <div className="pill-input-wrap">
                                            <input
                                                type="text"
                                                placeholder="6-Digit Code"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                maxLength="6"
                                                required
                                            />
                                            <span className="input-icon">🔑</span>
                                        </div>
                                        <div className="pill-input-wrap" style={{ marginTop: '1rem' }}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? "👁️" : "👁️‍🗨️"}
                                            </button>
                                        </div>

                                        <button type="submit" className="btn-pill-submit" disabled={isLoading} style={{ marginTop: '1rem' }}>
                                            {isLoading ? 'Resetting...' : 'Change Password'}
                                        </button>
                                    </form>
                                )}

                                <div className="social-divider">
                                    <span>Or back to security</span>
                                </div>

                                <div className="social-logins">
                                    <button className="social-btn" onClick={() => navigate('/login')}>{socialIcons.google}</button>
                                    <button className="social-btn" onClick={() => navigate('/login')}>{socialIcons.apple}</button>
                                    <button className="social-btn" onClick={() => navigate('/login')}>{socialIcons.facebook}</button>
                                </div>

                                <p className="form-footer-text">
                                    Remember your password? <Link to="/login" className="text-btn highlight">Sign In!</Link>
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
