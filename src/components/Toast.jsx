import { motion, AnimatePresence } from 'framer-motion'
import './Toast.css'

const Toast = ({ message, type, isVisible, onClose }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`toast-container ${type}`}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="toast-content">
                        <span className="toast-icon">
                            {type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}
                        </span>
                        <p className="toast-message">{message}</p>
                        <button className="toast-close" onClick={onClose}>×</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Toast
