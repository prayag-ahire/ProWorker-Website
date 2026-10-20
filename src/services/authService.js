const BASE_API_URL = 'https://api.proworker.co/api';
const API_BASE_URL = `${BASE_API_URL.replace(/\/$/, '')}/v1/website`;
const GOOGLE_SIGNIN_URL = import.meta.env.PUBLIC_GOOGLE_SIGNIN_URL || `${BASE_API_URL.replace(/\/$/, '')}/v1/website/google-signin`;

import decodeJwt from '../utils/decodeJwt';

const SESSION_KEYS = [
  'authToken',
  'userId',
  'clientId',
  'workerId',
  'userRole',
  'profileCompleted',
  'userName',
  'userEmail',
  'userMobile',
  'authProvider',
];

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const storageGet = (key) => (canUseStorage() ? localStorage.getItem(key) : null);
const storageSet = (key, value) => {
  if (canUseStorage()) localStorage.setItem(key, value);
};
const storageRemove = (key) => {
  if (canUseStorage()) localStorage.removeItem(key);
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const normalizeRole = (role) => (role === 'worker' ? 'worker' : 'client');

export const normalizeMobile = (mobile) => {
  const digits = String(mobile || '').replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
};

const persistSession = (data = {}, fallback = {}) => {
  const token = data.token ?? fallback.token;
  const jwtPayload = decodeJwt(token) || {};
  const userId = data.userId ?? fallback.userId ?? jwtPayload.userId;
  const clientId = data.clientId ?? fallback.clientId;
  const workerId = data.workerId ?? fallback.workerId;
  const role = normalizeRole(data.role ?? fallback.role ?? jwtPayload.role);
  const profileCompleted = data.profileCompleted ?? fallback.profileCompleted;
  const userName = data.userName ?? fallback.userName;
  const userEmail = data.userEmail ?? fallback.userEmail;
  const userMobile = data.mobile ?? fallback.mobile;
  const authProvider = data.authProvider ?? fallback.authProvider;

  if (token) {
    storageSet('authToken', token);
  }

  if (userId !== undefined && userId !== null) {
    storageSet('userId', String(userId));
  }

  storageSet('userRole', role);

  if (role === 'worker') {
    storageRemove('clientId');
    if (workerId !== undefined && workerId !== null) {
      storageSet('workerId', String(workerId));
    }
  } else {
    storageRemove('workerId');
    if (clientId !== undefined && clientId !== null) {
      storageSet('clientId', String(clientId));
    }
  }

  if (profileCompleted !== undefined && profileCompleted !== null) {
    storageSet('profileCompleted', String(Boolean(profileCompleted)));
  }

  if (userName) {
    storageSet('userName', userName);
  }

  if (userEmail) {
    storageSet('userEmail', userEmail);
  }

  if (userMobile) {
    storageSet('userMobile', userMobile);
  }

  if (authProvider) {
    storageSet('authProvider', authProvider);
  }
};

const clearSession = () => {
  SESSION_KEYS.forEach((key) => storageRemove(key));
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
    role: 'client',
    profileCompleted: true,
    userName: payload.name || payload.given_name || payload.email || 'Google User',
    userEmail: payload.email || '',
    authProvider: 'google',
  };
};

export const authService = {
  sendOtp: async (mobile, role = 'client') => {
    const normalizedRole = normalizeRole(role);
    const normalizedMobile = normalizeMobile(mobile);

    if (normalizedMobile.length !== 10) {
      throw new Error('Enter a valid 10-digit mobile number');
    }

    const response = await fetch(`${BASE_API_URL}/v1/${normalizedRole}/login/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: normalizedMobile }),
    });

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send OTP');
    }

    return {
      ...data,
      mobile: normalizedMobile,
      role: normalizedRole,
      OTPID: data.OTPID ?? data.otpId ?? data.otpID,
    };
  },

  verifyOtp: async (otpId, otp, role = 'client', mobile = '') => {
    const normalizedRole = normalizeRole(role);

    if (otpId === undefined || otpId === null || String(otpId).trim() === '') {
      throw new Error('OTP session expired. Please request a new code.');
    }

    if (!otp) {
      throw new Error('Enter the OTP sent to your mobile number');
    }

    const response = await fetch(`${BASE_API_URL}/v1/${normalizedRole}/login/otp/Verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTPID: String(otpId),
        OTP: String(otp).trim(),
      }),
    });

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed');
    }

    persistSession(data, {
      role: normalizedRole,
      mobile,
      authProvider: 'otp',
    });

    return {
      ...data,
      role: normalizedRole,
      mobile,
      authProvider: 'otp',
    };
  },

  signIn: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJson(response);

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      persistSession(data, { authProvider: 'email', userEmail: email, role: 'client' });

      return data;
    } catch (err) {
      console.error('Sign in error:', err);
      throw err;
    }
  },

  signUp: async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await parseJson(response);

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      persistSession(data, { authProvider: 'email', userEmail: email, userName: name, role: 'client' });

      return data;
    } catch (err) {
      console.error('Sign up error:', err);
      throw err;
    }
  },

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

          const data = await parseJson(response);

          if (response.ok) {
            persistSession(data, {
              token: data.token || `google-${payload.sub || payload.email || Date.now()}`,
              userId: data.userId || payload.sub || payload.email || `google-${Date.now()}`,
              clientId: data.clientId || payload.email || payload.sub || '',
              role: 'client',
              profileCompleted: data.profileCompleted ?? true,
              userName: data.userName || payload.name || payload.given_name || payload.email || 'Google User',
              userEmail: data.userEmail || payload.email || '',
              authProvider: 'google',
            });

            return {
              ...data,
              role: 'client',
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

  deleteAccount: async () => {
    try {
      const token = storageGet('authToken');
      const role = normalizeRole(storageGet('userRole'));

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_API_URL}/v1/${role}/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await parseJson(response);

      if (!response.ok) {
        const fallbackResponse = await fetch(`${API_BASE_URL}/delete-account`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const fallbackData = await parseJson(fallbackResponse);

        if (!fallbackResponse.ok) {
          throw new Error(data.message || fallbackData.message || 'Account deletion failed');
        }

        clearSession();
        return fallbackData;
      }

      clearSession();
      return data;
    } catch (err) {
      console.error('Delete account error:', err);
      throw err;
    }
  },

  isAuthenticated: () => {
    return !!storageGet('authToken');
  },

  getCurrentUser: () => {
    return {
      userId: storageGet('userId'),
      clientId: storageGet('clientId'),
      workerId: storageGet('workerId'),
      role: storageGet('userRole') || 'client',
      name: storageGet('userName'),
      email: storageGet('userEmail'),
      mobile: storageGet('userMobile'),
      authProvider: storageGet('authProvider'),
      profileCompleted: storageGet('profileCompleted') === 'true',
      isAuthenticated: !!storageGet('authToken'),
    };
  },

  logout: () => {
    clearSession();
  },

  getToken: () => {
    return storageGet('authToken');
  },
};
