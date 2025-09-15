import { useState } from 'react';

export const useAlert = () => {
    const [alerts, setAlerts] = useState([]);

    const showAlert = (type, message, duration = 3000) => {
        const id = Date.now() + Math.random();
        const newAlert = { id, type, message, duration };
        
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);

        // Auto remove alert
        setTimeout(() => {
            removeAlert(id);
        }, duration);

        return id;
    };

    const removeAlert = (id) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    };

    const showSuccess = (message, duration) => showAlert('success', message, duration);
    const showError = (message, duration) => showAlert('error', message, duration);
    const showWarning = (message, duration) => showAlert('warning', message, duration);
    const showInfo = (message, duration) => showAlert('info', message, duration);

    return {
        alerts,
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeAlert
    };
};