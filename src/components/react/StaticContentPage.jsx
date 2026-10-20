import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PrivacyPolicy from '../PrivacyPolicy';
import ChildSafetyStandards from '../ChildSafetyStandards';

const contentMap = {
  privacy: PrivacyPolicy,
  'child-safety': ChildSafetyStandards,
};

export default function StaticContentPage({ page }) {
  const [viewMode, setViewMode] = useState('client');
  const Content = contentMap[page] || PrivacyPolicy;

  return (
    <ViewModeContext.Provider value={viewMode}>
      <div className="App">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <Content />
        <Footer />
      </div>
    </ViewModeContext.Provider>
  );
}
