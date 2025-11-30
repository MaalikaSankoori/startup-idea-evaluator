import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import Evaluate from './pages/Evaluate';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30">
                {/* Background Gradients */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8 flex-grow">
                        <Routes>
                            {/* Landing page */}
                            <Route path="/" element={<Home />} />

                            {/* Auth */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Main app pages (protected) */}
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />

                            {/* Idea input / evaluation form (protected) */}
                            <Route
                                path="/evaluate"
                                element={
                                    <PrivateRoute>
                                        <Evaluate />
                                    </PrivateRoute>
                                }
                            />

                            {/* Result page showing evaluation (protected) */}
                            <Route
                                path="/result/:id?"
                                element={
                                    <PrivateRoute>
                                        <Result />
                                    </PrivateRoute>
                                }
                            />


                            {/* Old /result/:id links redirect to home */}
                            <Route path="/result/:id" element={<Navigate to="/" replace />} />

                            {/* Fallback: unknown routes → home */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>

                    <footer className="border-t border-white/5 py-8 text-center text-sm text-muted-foreground">
                        <p>
                            © {new Date().getFullYear()} Venturify. AI-Powered Startup
                            Evaluation.
                        </p>
                    </footer>
                </div>
            </div>
        </Router>
    );
}

export default App;
