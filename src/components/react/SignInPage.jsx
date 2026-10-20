import { useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import { AuthProvider } from '../../context/AuthContext';
import Navbar from '../Navbar';
import SignIn from '../SignIn';
import Footer from '../Footer';

export default function SignInPage() {
  const [viewMode, setViewMode] = useState('client');

  return (
    <AuthProvider>
      <ViewModeContext.Provider value={viewMode}>
        <div className="App">
          <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
          <SignIn />
          <Footer />
        </div>
      </ViewModeContext.Provider>
    </AuthProvider>
  );
}
