import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  MantineProvider,
  createTheme,
  Center,
  Loader,
  Text,
} from "@mantine/core";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import App from "./App";
import { setAuthToken } from "./data";
import { AppConfigProvider, useAppConfig } from "./contexts/AppConfigContext";

// ── Theme ─────────────────────────────────────────────────────────────────────
const theme = createTheme({
  primaryColor: "red",
  colors: {
    red: [
      "#fff1f2",
      "#ffe4e6",
      "#fecdd3",
      "#fda4af",
      "#fb7185",
      "#f43f5e",
      "#e11d48",
      "#be123c",
      "#9f1239",
      "#881337",
    ],
  },
  fontFamily: "Inter, -apple-system, sans-serif",
  defaultRadius: "sm",
});

// ── Router ────────────────────────────────────────────────────────────────────
const router = createMemoryRouter([{ path: "*", element: <App /> }]);

// ── Root ──────────────────────────────────────────────────────────────────────
function Root() {
  const { updateConfig } = useAppConfig();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || event.data.type !== "PIVOTLY_APP_CONFIG") return;

      const { authToken, appSlug } = event.data;

      console.log('Values from parent app', event.data)

      if (!authToken || !appSlug) {
        setError(
          "APP_CONFIG is missing required fields: authToken, appSlug, appPageSlug",
        );
        return;
      }

      setAuthToken(authToken);
      updateConfig({ authToken, appSlug, appPageSlug: "" });
      setReady(true);
    }

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "APP_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, [updateConfig]);

  if (error) {
    return (
      <Center
        style={{
          height: "100vh",
          flexDirection: "column",
          gap: 8,
          background: "#141414",
        }}
      >
        <Text size="xs" c="#ef4444" fw={600}>
          Configuration error
        </Text>
        <Text size="xs" c="#666">
          {error}
        </Text>
      </Center>
    );
  }

  if (!ready) {
    return (
      <Center
        style={{
          height: "100vh",
          flexDirection: "column",
          gap: 12,
          background: "#141414",
        }}
      >
        <Loader color="red" size="sm" />
        <Text size="xs" c="#666">
          Waiting for configuration…
        </Text>
      </Center>
    );
  }

  return <RouterProvider router={router} />;
}

// ── Mount ─────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="light">
    <AppConfigProvider>
      <Root />
    </AppConfigProvider>
  </MantineProvider>,
);
