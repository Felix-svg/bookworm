import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute";
import MainLayout from "./components/MainLayout";
import NotFoundPage from "./pages/NotFound";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import About from "./components/About";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <ThemeProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <RedirectRoute redirectTo="/books">
                      <HomePage />
                    </RedirectRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <UsersPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users/:id"
                  element={
                    <PrivateRoute>
                      <UserDetailPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/books"
                  element={
                    <PrivateRoute>
                      <BooksPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/books/:id"
                  element={
                    <PrivateRoute>
                      <BookDetailPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </Router>
        </ThemeProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;
