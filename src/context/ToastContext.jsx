import { createContext, useState, useContext, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext()

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    })

    const showToast = useCallback((message, type = 'info') => {
        setToast({
            isVisible: true,
            message,
            type
        })

        // Auto hide after 5 seconds
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }))
        }, 5000)
    }, [])

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    )
}
