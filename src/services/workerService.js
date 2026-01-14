// API service for worker-related requests
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const workerService = {
  // Get current user location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  // Search workers by profession and location
  searchWorkers: async (profession, latitude, longitude, limit = 7) => {
    try {
      const params = new URLSearchParams({
        profession,
        latitude,
        longitude,
        limit
      });

      const response = await fetch(
        `${API_BASE_URL}/workers/search?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching workers:', error);
      throw error;
    }
  },

  // Get list of available professions
  getProfessions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/professions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching professions:', error);
      throw error;
    }
  },

  // Get worker details
  getWorkerDetails: async (workerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workers/${workerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching worker details:', error);
      throw error;
    }
  },
};
