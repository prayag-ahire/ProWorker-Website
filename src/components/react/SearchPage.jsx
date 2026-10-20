import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import { LocationProvider } from '../../context/LocationContext';
import Navbar from '../Navbar';
import WorkerSearch from '../WorkerSearch';
import Footer from '../Footer';

export default function SearchPage() {
  const [viewMode, setViewMode] = useState('client');

  return (
    <ViewModeContext.Provider value={viewMode}>
      <LocationProvider>
        <div className="App">
          <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
          <WorkerSearch />
          <Footer />
        </div>
      </LocationProvider>
    </ViewModeContext.Provider>
  );
}
