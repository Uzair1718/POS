import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
                    <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-red-100">
                        <div className="bg-red-500 p-6 flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full text-white">
                                <AlertTriangle size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">System Error</h1>
                                <p className="text-red-100">Something went wrong while rendering the application.</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold text-slate-800">Error Details</h2>
                                <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
                                    <code className="text-red-400 block mb-2 font-mono text-sm">
                                        {this.state.error && this.state.error.toString()}
                                    </code>
                                    <details>
                                        <summary className="text-slate-500 cursor-pointer hover:text-slate-300 text-xs">Stack Trace</summary>
                                        <pre className="text-slate-500 text-xs mt-2 font-mono whitespace-pre-wrap">
                                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                                        </pre>
                                    </details>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                                >
                                    Reload Application
                                </button>
                                <button
                                    onClick={() => {
                                        localStorage.clear();
                                        window.location.reload();
                                    }}
                                    className="px-6 py-3 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors"
                                >
                                    Clear Data & Reset
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 text-center">
                                If clearing data doesn't fix it, please contact support with the error details above.
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
