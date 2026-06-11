import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { setAuthToken } from "../data";

// ── postMessage event types shared between iframe and parent ─────────────────
const MSG = {
  // Iframe → Parent
  APP_READY: "PIVOTLY_APP_READY",
  REFRESH_AUTH_TOKEN: "PIVOTLY_REFRESH_AUTH_TOKEN",
  // Parent → Iframe
  APP_CONFIG: "PIVOTLY_APP_CONFIG",
  AUTH_TOKEN_UPDATED: "PIVOTLY_AUTH_TOKEN_UPDATED",
};

const AppConfigContext = createContext(null);

export function PivotlyAppConfigProvider({ children }) {
  const [config, setConfig] = useState({
    authToken: null,
    appSlug: null,
  });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  // ── Receive messages from parent ──────────────────────────────────────────
  useEffect(() => {
    function handleMessage(event) {
      if (!event.data?.type) return;

      switch (event.data.type) {
        // Parent sends initial config
        case MSG.APP_CONFIG: {
          const { authToken, appSlug } = event.data;

          if (!authToken || !appSlug) {
            setError(
              `${MSG.APP_CONFIG} is missing required fields: authToken, appSlug`,
            );
            return;
          }

          setAuthToken(authToken);
          setConfig({ authToken, appSlug });
          setReady(true);
          break;
        }

        // Parent sends a refreshed token
        case MSG.AUTH_TOKEN_UPDATED: {
          if (!event.data.token) return;
          setAuthToken(event.data.token);
          setConfig((prev) => ({ ...prev, authToken: event.data.token }));
          break;
        }

        default:
          break;
      }
    }

    window.addEventListener("message", handleMessage);

    // ── Signal to parent that the app is ready to receive config ─────────────
    window.parent.postMessage({ type: MSG.APP_READY }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ── Send messages to parent ───────────────────────────────────────────────
  const requestTokenRefresh = useCallback(() => {
    window.parent.postMessage({ type: MSG.REFRESH_AUTH_TOKEN }, "*");
  }, []);

  return (
    <AppConfigContext.Provider
      value={{ config, ready, error, requestTokenRefresh }}
    >
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx)
    throw new Error("useAppConfig must be used within PivotlyAppConfigProvider");
  return ctx;
}
