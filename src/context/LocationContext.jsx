/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { workerService } from '../services/workerService';

const LocationContext = createContext(null);

function geolocationMessage(error) {
  if (!error) {
    return 'Unable to get your location. Please enable location permissions.';
  }
  if (error.code === 1) {
    return 'Location permission was denied. Enable it to see nearby workers.';
  }
  if (error.code === 2) {
    return 'Your location is currently unavailable. Try again.';
  }
  if (error.code === 3) {
    return 'Location request timed out. Try again.';
  }
  return error.message || 'Unable to get your location. Please enable location permissions.';
}

async function resolvePlaceName(coords) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || 'Current location';
  } catch {
    return 'Current location';
  }
}

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState('');
  const requestedRef = useRef(false);

  const refreshLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError('');

    try {
      const coords = await workerService.getCurrentLocation();
      setLocation(coords);
      const name = await resolvePlaceName(coords);
      setLocationName(name);
    } catch (error) {
      setLocation(null);
      setLocationName('');
      setLocationError(geolocationMessage(error));
    } finally {
      setLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (requestedRef.current) {
      return;
    }
    requestedRef.current = true;
    refreshLocation();
  }, [refreshLocation]);

  return (
    <LocationContext.Provider
      value={{
        location,
        locationName,
        locationLoading,
        locationError,
        refreshLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}
