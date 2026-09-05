import { useState, useEffect, useRef, useCallback } from 'react';
import { workerService } from '../services/workerService';
import WorkerList from './WorkerList';
import { getSearchProfessionFromHash, goToSearch } from '../utils/goToSearch';
import { useLocation } from '../context/LocationContext';
import './WorkerSearch.css';

function WorkerSearch() {
  const {
    location,
    locationName,
    locationLoading,
    locationError,
    refreshLocation,
  } = useLocation();

  const [profession, setProfession] = useState(() => getSearchProfessionFromHash());
  const [professions, setProfessions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchMode, setSearchMode] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const lastSearchKeyRef = useRef('');
  const searchGenRef = useRef(0);

  useEffect(() => {
    const syncProfessionFromHash = () => {
      const fromHash = getSearchProfessionFromHash();
      setProfession(fromHash);
    };

    syncProfessionFromHash();
    window.addEventListener('hashchange', syncProfessionFromHash);
    return () => window.removeEventListener('hashchange', syncProfessionFromHash);
  }, []);

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

  const runSearch = useCallback(async (pageNumber = 1) => {
    if (!profession || !location) {
      return;
    }

    const searchKey = `${profession}|${location.latitude}|${location.longitude}|${pageNumber}`;
    if (pageNumber === 1 && lastSearchKeyRef.current === searchKey) {
      return;
    }

    const requestGen = ++searchGenRef.current;
    setSearchAttempted(true);
    setSearchLoading(true);
    setSearchError('');

    try {
      const results = await workerService.searchWorkers(
        profession,
        location.latitude,
        location.longitude,
        pageNumber
      );
      if (requestGen !== searchGenRef.current) {
        return;
      }
      lastSearchKeyRef.current = searchKey;
      setWorkers(results.workers || []);
      setPagination(results.pagination);
      setSearchMode(results.searchMode || '');
      setSearchMessage(results.message || '');
      setCurrentPage(pageNumber);
      if (pageNumber > 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      if (requestGen !== searchGenRef.current) {
        return;
      }
      lastSearchKeyRef.current = '';
      setSearchError('Failed to search workers. Please try again.');
      setWorkers([]);
      setPagination(null);
      setSearchMode('');
      setSearchMessage('');
    } finally {
      if (requestGen === searchGenRef.current) {
        setSearchLoading(false);
      }
    }
  }, [profession, location]);

  useEffect(() => {
    searchGenRef.current += 1;
    lastSearchKeyRef.current = '';
    setWorkers([]);
    setPagination(null);
    setSearchError('');
    setCurrentPage(1);
    setSearchAttempted(Boolean(profession));
    setSearchLoading(Boolean(profession));
  }, [profession]);

  useEffect(() => {
    if (!profession || !location) {
      return;
    }
    runSearch(1);
  }, [profession, location, runSearch]);

  const handleProfessionChange = (nextProfession) => {
    setProfession(nextProfession);
    goToSearch(nextProfession);
  };

  const handleRefine = (event) => {
    event.preventDefault();
    lastSearchKeyRef.current = '';
    runSearch(1);
  };

  const listingActive = Boolean(profession);
  const locationLabel = locationName
    || (location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : '');

  return (
    <div className="worker-search-container">
      <form className="search-toolbar" onSubmit={handleRefine}>
        <div className="search-toolbar-fields">
          <div className="form-group">
            <label htmlFor="profession">Service</label>
            <select
              id="profession"
              value={profession}
              onChange={(e) => handleProfessionChange(e.target.value)}
              className="form-select"
            >
              <option value="">Select a profession...</option>
              {profession && !professions.some((prof) => prof.name === profession) && (
                <option value={profession}>{profession}</option>
              )}
              {professions.map((prof) => (
                <option key={prof.id} value={prof.name}>
                  {prof.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <div className="location-input-group">
              <input
                id="location"
                type="text"
                placeholder={locationLoading ? 'Getting your location...' : 'Enable location'}
                value={locationLoading ? 'Getting your location...' : locationLabel}
                disabled
                className="form-input"
              />
              <button
                type="button"
                onClick={refreshLocation}
                disabled={locationLoading}
                className="btn-location"
                title="Use your current location"
              >
                {locationLoading ? '...' : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={searchLoading || !location || !profession}
          className="btn-search btn-search-compact"
        >
          {searchLoading && location ? 'Searching...' : 'Refine search'}
        </button>
      </form>

      {(locationError || searchError) && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{searchError || locationError}</span>
          {locationError && !location && (
            <button type="button" className="btn-location-retry" onClick={refreshLocation} disabled={locationLoading}>
              Enable location
            </button>
          )}
        </div>
      )}

      <div className="search-listing">
        {!listingActive && (
          <div className="search-prompt">
            <h2>Find nearby workers</h2>
            <p>Choose a service to see skilled workers near you.</p>
          </div>
        )}

        {listingActive && !location && !locationLoading && (
          <div className="search-prompt">
            <h2>Enable location to see nearby {profession} workers</h2>
            <p>We use your location once to show workers around you. Nothing is booked from this page.</p>
            <button type="button" className="btn-search btn-search-inline" onClick={refreshLocation}>
              Enable location
            </button>
          </div>
        )}

        {listingActive && locationLoading && !location && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Getting your location...</p>
          </div>
        )}

        {listingActive && location && (
          <div className="search-results">
            {searchLoading && workers.length === 0 ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Finding nearby {profession} workers...</p>
              </div>
            ) : searchAttempted && workers.length > 0 ? (
              <>
                <div className="results-header">
                  <h3>
                    {pagination?.total_workers || workers.length}{' '}
                    {(pagination?.total_workers || workers.length) === 1 ? 'Professional' : 'Professionals'} Found
                  </h3>
                  <p className="results-subtitle">
                    {searchMessage || (
                      <>
                        {searchMode === 'nearby' ? 'Nearby' : searchMode || 'Nearby'} •{' '}
                        <span className="highlight-text">Sorted by distance</span>
                      </>
                    )}
                  </p>
                </div>
                <WorkerList workers={workers} />

                {pagination && pagination.total_pages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => runSearch(currentPage - 1)}
                      disabled={currentPage === 1 || searchLoading}
                      className="pagination-btn"
                    >
                      ← Previous
                    </button>

                    <div className="pagination-info">
                      Page {pagination.current_page} of {pagination.total_pages}
                    </div>

                    <button
                      onClick={() => runSearch(currentPage + 1)}
                      disabled={currentPage === pagination.total_pages || searchLoading}
                      className="pagination-btn"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : searchAttempted && !searchLoading ? (
              <div className="no-results">
                <h3>No professionals found nearby.</h3>
                <p className="no-results-subtitle">
                  Try expanding your search area or choosing a different service.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkerSearch;
