// API service for worker-related requests
const API_BASE_URL = 'https://api.proworker.co/api/v1/website';

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

  // Search workers by profession and location with pagination
  searchWorkers: async (profession, latitude, longitude, page = 1) => {
    try {
      const params = new URLSearchParams({
        profession,
        latitude,
        longitude,
        page
      });

      const response = await fetch(
        `${API_BASE_URL}/find-workers?${params.toString()}`,
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

      // Transform API response to match component expectations
      if (data.success && data.data) {
        return {
          success: data.success,
          searchMode: data.search_mode,
          message: data.message,
          workers: (data.data.workers || []).map(worker => ({
            id: worker.id,
            name: worker.username,
            email: worker.email,
            age: worker.age,
            gender: worker.gender,
            profileImage: worker.imageUrl,
            bio: worker.description,
            profession: worker.profession,
            hourlyRate: worker.charges_per_visit,
            distanceCharges: worker.distance_charges,
            distance: worker.distance_km,
            rating: worker.rating,
            reviewCount: worker.review_count,
            isOnline: worker.isOnline,
            status: worker.status,
            defaultAddress: worker.default_address
              ? {
                  label: worker.default_address.label,
                  address: worker.default_address.address,
                  latitude: worker.default_address.latitude,
                  longitude: worker.default_address.longitude
                }
              : null
          })),
          pagination: data.data.pagination
        };
      }
      
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
      
      // Transform profession data
      if (data.success && Array.isArray(data.data)) {
        return {
          professions: data.data.map(prof => ({
            id: prof.id,
            name: prof.name
          }))
        };
      }
      
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
