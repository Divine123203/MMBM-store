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
                    <div className="card-ornament top-left"></div>
                    <div className="card-ornament top-right"></div>
                    <div className="card-ornament bottom-left"></div>
                    <div className="card-ornament bottom-right"></div>

                    <div className="brand-identifier">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            MMBM
                        </motion.h1>
                        <div className="gold-line"></div>
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
                                        <input type="email" required placeholder="EMAIL ADDRESS" />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" required placeholder="PASSWORD" />
                                        <div className="input-line"></div>
                                    </div>
                                    <button type="submit" className="btn-noir">LOGIN</button>
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
                                        <input type="text" required placeholder="FULL NAME" />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <input type="email" required placeholder="EMAIL ADDRESS" />
                                        <div className="input-line"></div>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" required placeholder="PASSWORD" />
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
