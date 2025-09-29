import React, { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

const Toast = ({ id, type, title, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000); // Auto close after 5 seconds

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-success border-success/20 shadow-success/25';
            case 'error':
                return 'bg-error border-error/20 shadow-error/25';
            case 'warning':
                return 'bg-warning border-warning/20 shadow-warning/25';
            case 'info':
                return 'bg-info border-info/20 shadow-info/25';
            default:
                return 'bg-gray-500 border-gray-600 shadow-gray-500/25';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`${getToastStyles()} text-white p-4 rounded-lg shadow-lg border-l-4 min-w-80 max-w-md transform transition-all duration-300 ease-in-out animate-slide-in-right`}>
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                    {getIcon()}
                </div>
                <div className="flex-1">
                    {title && <h4 className="font-semibold text-sm">{title}</h4>}
                    <p className="text-sm opacity-90">{message}</p>
                </div>
                <button
                    onClick={() => onClose(id)}
                    className="flex-shrink-0 ml-3 text-white hover:text-gray-200 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { ...toast, id }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (message, title = 'Success') => {
        return addToast({ type: 'success', title, message });
    };

    const showError = (message, title = 'Error') => {
        return addToast({ type: 'error', title, message });
    };

    const showWarning = (message, title = 'Warning') => {
        return addToast({ type: 'warning', title, message });
    };

    const showInfo = (message, title = 'Info') => {
        return addToast({ type: 'info', title, message });
    };

    return (
        <ToastContext.Provider value={{
            showSuccess,
            showError,
            showWarning,
            showInfo,
            removeToast
        }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-3">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};