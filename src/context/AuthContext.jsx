/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const currentUser = authService.getCurrentUser();
    return currentUser.isAuthenticated ? currentUser : null;
  });
  const [isLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    try {
      setError(null);
      const response = await authService.signIn(email, password);
      setUser(authService.getCurrentUser());
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithGoogle = async (credentialResponse) => {
    try {
      setError(null);
      const response = await authService.signInWithGoogle(credentialResponse);
      setUser(authService.getCurrentUser());
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setError(null);
      const response = await authService.signUp(email, password, name);
      setUser(authService.getCurrentUser());
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteAccount = async () => {
    try {
      setError(null);
      const response = await authService.deleteAccount();
      setUser(null);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signIn,
        signInWithGoogle,
        signUp,
        deleteAccount,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
