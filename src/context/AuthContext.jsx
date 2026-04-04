import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({
        userId: localStorage.getItem('userId'),
        clientId: localStorage.getItem('clientId'),
        profileCompleted: localStorage.getItem('profileCompleted') === 'true',
      });
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      setError(null);
      const response = await authService.signIn(email, password);
      setUser({
        userId: response.userId,
        clientId: response.clientId,
        profileCompleted: response.profileCompleted,
      });
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
      setUser({
        userId: response.userId,
        clientId: response.clientId,
        profileCompleted: response.profileCompleted,
      });
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
