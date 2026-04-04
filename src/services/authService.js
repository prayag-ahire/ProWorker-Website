const API_BASE_URL = 'https://proworker.onrender.com/api/v1/website';

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

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('clientId', data.clientId);
        localStorage.setItem('profileCompleted', data.profileCompleted);
      }

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

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('clientId', data.clientId);
        localStorage.setItem('profileCompleted', data.profileCompleted);
      }

      return data;
    } catch (err) {
      console.error('Sign up error:', err);
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
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('clientId');
      localStorage.removeItem('profileCompleted');

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
      profileCompleted: localStorage.getItem('profileCompleted') === 'true',
      isAuthenticated: !!localStorage.getItem('authToken'),
    };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('clientId');
    localStorage.removeItem('profileCompleted');
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};
