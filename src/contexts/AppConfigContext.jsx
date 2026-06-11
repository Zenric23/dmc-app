import { createContext, useContext, useState } from "react";

const AppConfigContext = createContext(null);

export function AppConfigProvider({ children }) {
  const [config, setConfig] = useState({
    authToken: null,
    appSlug: null,
    appPageSlug: null,
  });

  function updateConfig({ authToken, appSlug, appPageSlug }) {
    setConfig({ authToken, appSlug, appPageSlug });
  }

  return (
    <AppConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx)
    throw new Error("useAppConfig must be used within AppConfigProvider");
  return ctx;
}
