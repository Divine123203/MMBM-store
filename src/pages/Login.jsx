import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGoogleLogin } from '@react-oauth/google'
import './Login.css'
import { API_BASE_URL } from '../config'
import { useToast } from '../context/ToastContext'

const Login = ({ setUserInfo }) => {
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()
    const { showToast } = useToast()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [showVerify, setShowVerify] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data))
                setUserInfo(data)
                showToast('Welcome back!', 'success')
                navigate('/')
            } else {
                showToast(data.message || 'Login failed', 'error')
            }
        } catch (err) {
            showToast('Something went wrong. Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            const data = await res.json()
            if (res.ok) {
                setShowVerify(true)
                showToast('Verification code sent! Check your email.', 'success')
            } else {
                showToast(data.message || 'Registration failed', 'error')
            }
        } catch (err) {
            showToast('Connection error. Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verificationCode }),
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data))
                setUserInfo(data)
                setUserInfo(data)
                showToast('Account verified successfully!', 'success')
                navigate('/')
            } else {
                showToast(data.message || 'Invalid code', 'error')
            }
        } catch (err) {
            console.error('Verify Error:', err)
            showToast('Something went wrong during verification.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true)
            try {
                const fetchProfile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                const profile = await fetchProfile.json()

                const res = await fetch(`${API_BASE_URL}/api/users/google-auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: profile.name,
                        email: profile.email,
                        sub: profile.sub
                    }),
                })
                const data = await res.json()
                if (res.ok) {
                    // Check if it's a registration attempt for an existing user
                    if (!isLogin && !data.isNewUser) {
                        setIsLogin(true)
                        showToast('Account already exists. Redirected to Sign In.', 'info')
                        setIsLoading(false)
                        return
                    }

                    localStorage.setItem('userInfo', JSON.stringify(data))
                    setUserInfo(data)
                    showToast(`Welcome ${data.name}!`, 'success')
                    navigate('/')
                } else {
                    showToast(data.message || 'Google Login failed', 'error')
                }
            } catch (err) {
                showToast('Google authentication failed', 'error')
            } finally {
                setIsLoading(false)
            }
        },
        onError: () => showToast('Google Login Failed', 'error'),
    })

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
                {/* Left Side: Fashion Editorial Visual */}
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

                {/* Right Side: Form */}
                <div className="login-form-side">
                    <nav className="login-nav">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/contact">Contact</Link>
                        <div className="login-nav-right">
                            <button className={`nav-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</button>
                            <button className={`nav-btn register-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
                        </div>
                    </nav>

                    <div className="form-container">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="form-content"
                                >
                                    <h1 className="form-greeting">Hello !<br />Welcome Back</h1>

                                    <form className="pill-form" onSubmit={handleLogin}>
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
                                        <div className="pill-input-wrap">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? "👁️" : "👁️‍🗨️"}
                                            </button>
                                        </div>

                                        <div className="form-utilities">
                                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                                                <button type="button" className="text-btn">Recover Password ?</button>
                                            </Link>
                                        </div>

                                        <button type="submit" className="btn-pill-submit" disabled={isLoading}>
                                            {isLoading ? 'Wait...' : 'Sign In'}
                                        </button>
                                    </form>

                                    <div className="social-divider">
                                        <span>Or continue with</span>
                                    </div>

                                    <div className="social-logins">
                                        <button className="social-btn" onClick={() => handleGoogleLogin()} type="button">
                                            {socialIcons.google}
                                        </button>
                                        <button className="social-btn" type="button">{socialIcons.apple}</button>
                                        <button className="social-btn" type="button">{socialIcons.facebook}</button>
                                    </div>

                                    <p className="form-footer-text">
                                        Don't Have an account ? <button className="text-btn highlight" onClick={() => setIsLogin(false)}>Create Account!</button>
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="form-content"
                                >
                                    <h1 className="form-greeting">Join Us !<br />{showVerify ? 'Verify Email' : 'Create Account'}</h1>

                                    {!showVerify ? (
                                        <form className="pill-form" onSubmit={handleRegister}>
                                            <div className="pill-input-wrap">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                                <span className="input-icon">👤</span>
                                            </div>
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
                                            <div className="pill-input-wrap">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Create Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                                </button>
                                            </div>

                                            <button type="submit" className="btn-pill-submit" disabled={isLoading}>
                                                {isLoading ? 'Sending...' : 'Create Account'}
                                            </button>
                                        </form>
                                    ) : (
                                        <form className="pill-form" onSubmit={handleVerify}>
                                            <p className="verify-instruction">A 6-digit code was sent to <strong>{email}</strong></p>
                                            <div className="pill-input-wrap">
                                                <input
                                                    type="text"
                                                    placeholder="123456"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    maxLength="6"
                                                    required
                                                />
                                                <span className="input-icon">🔑</span>
                                            </div>
                                            <button type="submit" className="btn-pill-submit" disabled={isLoading}>
                                                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                                            </button>
                                            <button type="button" className="text-btn resend-btn" onClick={handleRegister}>
                                                Didn't get code? Resend
                                            </button>
                                        </form>
                                    )}

                                    <div className="social-divider">
                                        <span>Or sign up with</span>
                                    </div>

                                    <div className="social-logins">
                                        <button className="social-btn" onClick={() => handleGoogleLogin()} type="button">
                                            {socialIcons.google}
                                        </button>
                                        <button className="social-btn" type="button">{socialIcons.apple}</button>
                                        <button className="social-btn" type="button">{socialIcons.facebook}</button>
                                    </div>

                                    <p className="form-footer-text">
                                        Already have an account ? <button className="text-btn highlight" onClick={() => setIsLogin(true)}>Sign In!</button>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
