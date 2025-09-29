import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error untuk monitoring
        console.error('Error caught by boundary:', error, errorInfo);
        
        // Kirim error ke service monitoring jika ada
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }
    }

    handleRefresh = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            {/* Error Icon */}
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>

                            {/* Error Message */}
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                            <p className="text-gray-600 mb-6">
                                We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
                            </p>

                            {/* Error Details (only in development) */}
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                                    <h3 className="font-semibold text-gray-900 mb-2">Error Details:</h3>
                                    <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                                        {this.state.error && this.state.error.toString()}
                                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                                    </pre>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                    onClick={this.handleRefresh}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    Refresh Page
                                </button>
                                <button 
                                    onClick={this.handleGoHome}
                                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                                >
                                    Go Home
                                </button>
                            </div>

                            {/* Support Info */}
                            <p className="text-sm text-gray-500 mt-6">
                                If this problem persists, please contact support.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;