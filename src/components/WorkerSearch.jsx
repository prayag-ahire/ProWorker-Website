import { useState, useEffect, useRef, useCallback } from 'react';
import { workerService } from '../services/workerService';
import WorkerList from './WorkerList';
import { getSearchProfessionFromUrl, goToSearch } from '../utils/goToSearch';
import { useLocation } from '../context/LocationContext';
import { serviceCategories } from '../data/categories';
import './WorkerSearch.css';

function WorkerSearch() {
  const {
    location,
    locationName,
    locationLoading,
    locationError,
    refreshLocation,
  } = useLocation();

  const [profession, setProfession] = useState(() => getSearchProfessionFromUrl());
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
    const syncProfessionFromUrl = () => {
      setProfession(getSearchProfessionFromUrl());
    };

    syncProfessionFromUrl();
    window.addEventListener('popstate', syncProfessionFromUrl);
    return () => window.removeEventListener('popstate', syncProfessionFromUrl);
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

  const listingActive = Boolean(profession);
  const locationLabel = locationName
    || (location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : '');

  const knownNames = new Set(serviceCategories.map((category) => category.name));
  const extraProfessions = professions.filter((prof) => !knownNames.has(prof.name));
  const sidebarCategories = [
    ...serviceCategories.filter((category) => !category.browseAll),
    ...extraProfessions.map((prof) => ({ id: prof.id, name: prof.name, icon: '🧰' })),
  ];

  return (
    <div className="worker-search-container">
      <div className="svc-search-layout">
        <aside className="svc-sidebar" aria-label="Service categories">
          {sidebarCategories.map((category) => {
            const isActive = profession === category.name;
            return (
              <button
                key={category.id}
                type="button"
                className={`svc-side-item ${isActive ? 'active' : ''}`}
                onClick={() => handleProfessionChange(category.name)}
              >
                <span className="svc-side-emoji" aria-hidden="true">{category.icon}</span>
                <span className="svc-side-label">{category.name}</span>
              </button>
            );
          })}
        </aside>

        <div className="svc-search-main">
      <div className="search-toolbar">
          <div className="form-group">
            <label htmlFor="location">Near you</label>
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
            <h2>Pick a trade</h2>
            <p>Choose a category to see nearby workers.</p>
          </div>
        )}

        {listingActive && !location && !locationLoading && (
          <div className="search-prompt">
            <h2>Enable location to see nearby {profession} workers</h2>
            <p>We use your location once to show workers around you. Contact them directly with 0% commission.</p>
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
                    {(pagination?.total_workers || workers.length) === 1 ? 'worker' : 'workers'} nearby
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
                <h3>No service providers found nearby.</h3>
                <p className="no-results-subtitle">
                  Try another trade on the left, or search from a different location.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerSearch;
