import { useState, useEffect } from 'react';
import { workerService } from '../services/workerService';
import WorkerList from './WorkerList';
import './WorkerSearch.css';

function WorkerSearch() {
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [professions, setProfessions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [locationName, setLocationName] = useState('');

  // Load professions on component mount
  useEffect(() => {
    const loadProfessions = async () => {
      try {
        const data = await workerService.getProfessions();
        setProfessions(data.professions || []);
      } catch (error) {
        console.error('Failed to load professions:', error);
      }
    };

    loadProfessions();
  }, []);

  // Get user's current location
  const handleGetLocation = async () => {
    setLoading(true);
    setLocationError('');

    try {
      const coords = await workerService.getCurrentLocation();
      setLocation(coords);

      // Try to get location name using reverse geocoding (optional)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
        );
        const data = await response.json();
        setLocationName(data.address?.city || data.address?.town || 'Current Location');
      } catch (err) {
        setLocationName('Current Location');
      }
    } catch (error) {
      setLocationError(error.message || 'Unable to get your location. Please enable location permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchAttempted(true);

    if (!profession) {
      setLocationError('Please select a profession');
      return;
    }

    if (!location) {
      setLocationError('Please enable location access to search');
      return;
    }

    setLoading(true);
    setLocationError('');

    try {
      const results = await workerService.searchWorkers(
        profession,
        location.latitude,
        location.longitude,
        7
      );
      setWorkers(results.workers || []);
    } catch (error) {
      setLocationError('Failed to search workers. Please try again.');
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="worker-search-container">
      <div className="search-header">
        <h2>Find Professionals</h2>
        <p>Connect with verified experts in your area instantly.</p>
      </div>

      <div className="search-card">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-grid">
            {/* Profession Selection */}
            <div className="form-group">
              <label htmlFor="profession">Service Type</label>
              <select
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="form-select"
              >
                <option value="">Select a profession...</option>
                {professions.map((prof) => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Selection */}
            <div className="form-group">
              <label htmlFor="location">Your Location</label>
              <div className="location-input-group">
                <input
                  id="location"
                  type="text"
                  placeholder="Location required"
                  value={locationName || (location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : '')}
                  disabled
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="btn-location"
                  title="Get your current location"
                >
                  {loading ? '...' : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {locationError && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{locationError}</span>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading || !location}
            className="btn-search"
          >
            {loading ? 'Searching...' : 'Find Workers Now'}
          </button>
        </form>
      </div>

      {/* Results */}
      {searchAttempted && (
        <div className="search-results">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Finding the best matches...</p>
            </div>
          ) : workers.length > 0 ? (
            <>
              <div className="results-header">
                <h3>{workers.length} {workers.length === 1 ? 'Professional' : 'Professionals'} Found</h3>
                <p className="results-subtitle">
                  Nearby • <span className="highlight-text">Verified</span>
                </p>
              </div>
              <WorkerList workers={workers} />
            </>
          ) : (
            <div className="no-results">
              <h3>No professionals found nearby.</h3>
              <p className="no-results-subtitle">
                Try expanding your search area or choosing a different service.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkerSearch;
