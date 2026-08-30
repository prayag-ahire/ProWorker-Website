/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const currentUser = authService.getCurrentUser();
    return currentUser.isAuthenticated ? currentUser : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAuthAction = async (action) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await action();
      setUser(authService.getCurrentUser());
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (mobile, role) => {
    try {
      setIsLoading(true);
      setError(null);
      return await authService.sendOtp(mobile, role);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otpId, otp, role, mobile) => {
    return runAuthAction(() => authService.verifyOtp(otpId, otp, role, mobile));
  };

  const signIn = async (email, password) => {
    return runAuthAction(() => authService.signIn(email, password));
  };

  const signInWithGoogle = async (credentialResponse) => {
    return runAuthAction(() => authService.signInWithGoogle(credentialResponse));
  };

  const signUp = async (email, password, name) => {
    return runAuthAction(() => authService.signUp(email, password, name));
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.deleteAccount();
      setUser(null);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
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
        sendOtp,
        verifyOtp,
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
