import { createContext, useContext } from 'react';
export const ViewModeContext = createContext('client');
export const useViewMode = () => useContext(ViewModeContext);
