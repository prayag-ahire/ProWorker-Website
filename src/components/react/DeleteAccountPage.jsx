import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import { AuthProvider } from '../../context/AuthContext';
import Navbar from '../Navbar';
import DeleteAccount from '../DeleteAccount';
import Footer from '../Footer';

export default function DeleteAccountPage() {
  const [viewMode, setViewMode] = useState('client');

  return (
    <AuthProvider>
      <ViewModeContext.Provider value={viewMode}>
        <div className="App">
          <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
          <DeleteAccount />
          <Footer />
        </div>
      </ViewModeContext.Provider>
    </AuthProvider>
  );
}
