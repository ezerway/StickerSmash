import { useCallback, useState, createContext, useEffect } from 'react';

import * as DebugService from '../services/DebugService';

export const DebugContext = createContext(null);

export const DebugContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const clearAllLogs = useCallback(() => {
    DebugService.clearAllLogs();
  }, []);

  const addLog = useCallback((message) => {
    DebugService.addLog(message);
  }, []);

  useEffect(() => {
    DebugService.getAllLogs().then((logs) => setLogs(logs))
  }, []);

  return (
    <DebugContext.Provider
      value={{
        logs,
        addLog,
        clearAllLogs,
      }}>
      {children}
    </DebugContext.Provider>
  );
};
