import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Navbar from '../Navbar';
import SalesPartner from '../SalesPartner';
import Footer from '../Footer';

export default function PartnerPage() {
  const [viewMode, setViewMode] = useState('client');

  return (
    <ViewModeContext.Provider value={viewMode}>
      <div className="App">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <SalesPartner />
        <Footer />
      </div>
    </ViewModeContext.Provider>
  );
}
