import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Navbar from '../Navbar';
import PartnerGuide from '../PartnerGuide';
import Footer from '../Footer';

export default function PartnerGuidePage() {
  const [viewMode, setViewMode] = useState('client');

  return (
    <ViewModeContext.Provider value={viewMode}>
      <div className="App">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <PartnerGuide />
        <Footer />
      </div>
    </ViewModeContext.Provider>
  );
}
