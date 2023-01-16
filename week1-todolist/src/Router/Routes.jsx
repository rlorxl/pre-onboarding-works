import React, { useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

function Router() {
  const Private = useCallback(({ children, to: direction, main }) => {
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn && !main) {
      return <Navigate to={direction} replace />;
    }
    if (!isLoggedIn && main) {
      return <Navigate to={direction} replace />;
    }

    return children;
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private to="/todo">
            <LoginPage />
          </Private>
        }
      />
      <Route
        path="/signup"
        element={
          <Private to="/todo">
            <SignupPage />
          </Private>
        }
      />
      <Route
        path="/todo"
        element={
          <Private to="/" main>
            <MainPage />
          </Private>
        }
      />
    </Routes>
  );
}

export default Router;
