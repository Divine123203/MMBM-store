import { motion } from 'framer-motion';

const variants = {
    'fade-up': {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    },
    'scale-up': {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    }
};

const ScrollReveal = ({
    children,
    variant = 'fade-up',
    delay = 0,
    duration = 0.8,
    threshold = 0.2,
    className = ""
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            transition={{
                delay,
                duration,
                ease: [0.21, 0.45, 0.32, 0.9] // Custom power ease
            }}
            variants={variants[variant]}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
