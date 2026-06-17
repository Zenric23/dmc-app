import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, Loader, Center } from "@mantine/core";
import AppHeader from "./components/AppHeader";
import PageContent from "./pages/PageContent";

import { useNav } from "./hooks/useNav";
import { usePageDetails } from "./hooks/usePageDetails";
import { useAppConfig } from "./contexts/PivotlyAppConfigContext";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { ready, error: configError } = useAppConfig();

  const { menuItems, defaultItem, loading: navLoading } = useNav();
  const {
    pageData,
    loading: pageLoading,
    error: pageError,
    slug,
    loadPage,
  } = usePageDetails();

  // ── Waiting for APP_CONFIG from parent ────────────────────────────────────
  if (!ready && !configError) {
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

  // ── Config error ──────────────────────────────────────────────────────────
  if (configError) {
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
          {configError}
        </Text>
      </Center>
    );
  }

  // ── Derive active nav item from URL, fall back to default ─────────────────
  const activeItem =
    menuItems.find((n) => n.path === pathname) ?? defaultItem ?? null;

  const resolvedSlug = activeItem?.page_slug ?? null;

  function handleNav(navItem) {
    navigate(navItem.path);
    loadPage(navItem.page_slug);
  }

  function handleRetry() {
    if (resolvedSlug) loadPage(resolvedSlug);
  }

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 13,
      }}
    >
      <AppHeader
        menuItems={menuItems}
        activeSlug={resolvedSlug}
        onNav={handleNav}
        navLoading={navLoading}
      />

      {activeItem ? (
        <PageContent
          pageData={pageData}
          loading={pageLoading}
          error={pageError}
          slug={slug}
          onRetry={handleRetry}
        />
      ) : (
        <Box
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 24,
            fontWeight: "bold",
            opacity: 0.7,
          }}
        >
          Select navigation item above
        </Box>
      )}
    </Box>
  );
}
