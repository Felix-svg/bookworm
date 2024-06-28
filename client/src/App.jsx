import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';

const App = () => {
    return (
        <AuthProvider>
            <SidebarProvider>
                <ThemeProvider>
                    <Router>
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                                <Route path="/users/:id" element={<PrivateRoute><UserDetailPage /></PrivateRoute>} />
                                <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
                                <Route path="/books/:id" element={<PrivateRoute><BookDetailPage /></PrivateRoute>} />
                            </Routes>
                        </MainLayout>
                    </Router>
                </ThemeProvider>
            </SidebarProvider>
        </AuthProvider>
    );
};

export default App;
