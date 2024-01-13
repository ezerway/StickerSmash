import { useCallback, useState, createContext, useEffect } from 'react';

import * as DebugService from '../services/DebugService';

export const DebugContext = createContext(null);

export const DebugContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = useCallback(() => DebugService.getAllLogs().then((logs) => setLogs(logs)));

  const clearAllLogs = useCallback(async () => {
    await DebugService.clearAllLogs();
    fetchLogs();
  }, []);

  const addLog = useCallback(async (message) => {
    await DebugService.addLog(message);
    fetchLogs();
  }, []);

  useEffect(() => {
    fetchLogs();
    return () => {};
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
