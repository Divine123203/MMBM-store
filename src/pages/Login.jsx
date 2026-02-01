import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="overlay-texture"></div>
            </div>

            <div className="login-container">
                <motion.div
                    className="login-glass-card"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="card-glaze"></div>

                    {/* Intricate Corner Ornaments */}
                    <div className="corner-ornament n-top-left">
                        <svg viewBox="0 0 100 100"><path d="M10,10 Q50,10 50,50 L50,10 M10,10 Q10,50 50,50 L10,50" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
                    </div>
                    <div className="corner-ornament n-top-right">
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(90deg)' }}><path d="M10,10 Q50,10 50,50 L50,10 M10,10 Q10,50 50,50 L10,50" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
                    </div>
                    <div className="corner-ornament n-bottom-left">
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}><path d="M10,10 Q50,10 50,50 L50,10 M10,10 Q10,50 50,50 L10,50" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
                    </div>
                    <div className="corner-ornament n-bottom-right">
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(180deg)' }}><path d="M10,10 Q50,10 50,50 L50,10 M10,10 Q10,50 50,50 L10,50" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
                    </div>

                    <div className="brand-identifier">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="serif-logo"
                        >
                            MMBM
                        </motion.h1>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6 }}
                                className="form-wrapper"
                            >
                                <h2>Access The Vault</h2>
                                <form className="noir-form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="input-group">
                                        <label>EMAIL</label>
                                        <input type="email" required />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <label>PASSWORD</label>
                                        <input type="password" required />
                                        <div className="input-line"></div>
                                    </div>
                                    <button type="submit" className="btn-noir">LOG IN</button>
                                </form>
                                <p className="form-switch">
                                    New to the brand? <span onClick={() => setIsLogin(false)}>Create Account</span>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6 }}
                                className="form-wrapper"
                            >
                                <h2>Join The Inner Circle</h2>
                                <form className="noir-form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="input-group">
                                        <label>FULL NAME</label>
                                        <input type="text" required />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <label>EMAIL ADDRESS</label>
                                        <input type="email" required />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <label>PASSWORD</label>
                                        <input type="password" required />
                                        <div className="input-line"></div>
                                    </div>
                                    <button type="submit" className="btn-noir">CREATE ACCOUNT</button>
                                </form>
                                <p className="form-switch">
                                    Already a member? <span onClick={() => setIsLogin(true)}>Enter Studio</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
