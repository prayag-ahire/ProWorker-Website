const BASE_API_URL = "https://api.proworker.co/api" || 'http://localhost:5000/api';
const API_BASE_URL = `${BASE_API_URL.replace(/\/$/, '')}/v1/website`;
const GOOGLE_SIGNIN_URL = import.meta.env.VITE_GOOGLE_SIGNIN_URL || `${BASE_API_URL.replace(/\/$/, '')}/v1/website/google-signin`;

import decodeJwt from '../utils/decodeJwt';

const persistSession = (data = {}, fallback = {}) => {
  const token = data.token ?? fallback.token;
  const userId = data.userId ?? fallback.userId;
  const clientId = data.clientId ?? fallback.clientId;
  const profileCompleted = data.profileCompleted ?? fallback.profileCompleted;
  const userName = data.userName ?? fallback.userName;
  const userEmail = data.userEmail ?? fallback.userEmail;
  const authProvider = data.authProvider ?? fallback.authProvider;

  if (token) {
    localStorage.setItem('authToken', token);
  }

  if (userId !== undefined && userId !== null) {
    localStorage.setItem('userId', String(userId));
  }

  if (clientId !== undefined && clientId !== null) {
    localStorage.setItem('clientId', String(clientId));
  }

  if (profileCompleted !== undefined && profileCompleted !== null) {
    localStorage.setItem('profileCompleted', String(Boolean(profileCompleted)));
  }

  if (userName) {
    localStorage.setItem('userName', userName);
  }

  if (userEmail) {
    localStorage.setItem('userEmail', userEmail);
  }

  if (authProvider) {
    localStorage.setItem('authProvider', authProvider);
  }
};

const clearSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('clientId');
  localStorage.removeItem('profileCompleted');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('authProvider');
};

const buildGoogleSession = (credential) => {
  const payload = decodeJwt(credential);

  if (!payload) {
    throw new Error('Google sign-in did not return a usable credential');
  }

  const userId = payload.sub || payload.email || `google-${Date.now()}`;

  return {
    token: `google-${userId}`,
    userId,
    clientId: payload.email || userId,
    profileCompleted: true,
    userName: payload.name || payload.given_name || payload.email || 'Google User',
    userEmail: payload.email || '',
    authProvider: 'google',
  };
};

export const authService = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      persistSession(data, { authProvider: 'email', userEmail: email });

      return data;
    } catch (err) {
      console.error('Sign in error:', err);
      throw err;
    }
  },

  // Sign up with email and password
  signUp: async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      persistSession(data, { authProvider: 'email', userEmail: email, userName: name });

      return data;
    } catch (err) {
      console.error('Sign up error:', err);
      throw err;
    }
  },

  // Sign in with Google
  signInWithGoogle: async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        throw new Error('Google sign-in did not return a credential');
      }

      const payload = decodeJwt(credential);

      if (payload) {
        try {
          const response = await fetch(GOOGLE_SIGNIN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              credential,
              profile: payload,
            }),
          });

          const data = await response.json().catch(() => ({}));

          if (response.ok) {
            persistSession(data, {
              token: data.token || `google-${payload.sub || payload.email || Date.now()}`,
              userId: data.userId || payload.sub || payload.email || `google-${Date.now()}`,
              clientId: data.clientId || payload.email || payload.sub || '',
              profileCompleted: data.profileCompleted ?? true,
              userName: data.userName || payload.name || payload.given_name || payload.email || 'Google User',
              userEmail: data.userEmail || payload.email || '',
              authProvider: 'google',
            });

            return {
              ...data,
              authProvider: 'google',
            };
          }

          throw new Error(data.message || 'Google sign-in failed');
        } catch (apiError) {
          console.warn('Falling back to local Google session:', apiError);
        }
      }

      const fallbackSession = buildGoogleSession(credential);
      persistSession(fallbackSession);

      return {
        ...fallbackSession,
        authProvider: 'google',
        localFallback: true,
      };
    } catch (err) {
      console.error('Google sign in error:', err);
      throw err;
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Account deletion failed');
      }

      // Clear localStorage on successful deletion
      clearSession();

      return data;
    } catch (err) {
      console.error('Delete account error:', err);
      throw err;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user data
  getCurrentUser: () => {
    return {
      userId: localStorage.getItem('userId'),
      clientId: localStorage.getItem('clientId'),
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      authProvider: localStorage.getItem('authProvider'),
      profileCompleted: localStorage.getItem('profileCompleted') === 'true',
      isAuthenticated: !!localStorage.getItem('authToken'),
    };
  },

  // Logout
  logout: () => {
    clearSession();
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};
