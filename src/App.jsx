import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Text, Button, Loader, Center } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import AppHeader from "./components/AppHeader";
import PageContent from "./pages/PageContent";
import ItemHeader from "./components/ItemHeader";
import LeftRail from "./components/LeftRail";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import { useNav } from "./hooks/useNav";
import { usePageDetails } from "./hooks/usePageDetails";
import { useIntakeItems } from "./hooks/useIntakeItems";

const INBOUND_SLUG = "apg-dmc-inbound";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { menuItems, defaultItem, loading: navLoading } = useNav();
  const {
    pageData,
    loading: pageLoading,
    error: pageError,
    slug,
    loadPage,
  } = usePageDetails();
  const {
    items,
    loading: intakeLoading,
    error: intakeError,
    stats,
    reload,
  } = useIntakeItems();
  const [selectedId, setSelectedId] = useState(null);

  // Derive active item from current URL path, fall back to default
  const activeItem =
    menuItems.find((n) => n.path === pathname) ?? defaultItem ?? null;

  const resolvedSlug = activeItem?.page_slug ?? null;
  const isInbound = resolvedSlug === INBOUND_SLUG;

  const selectedItem =
    items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  function handleNav(navItem) {
    navigate(navItem.path);
    if (navItem.page_slug !== INBOUND_SLUG) {
      loadPage(navItem.page_slug);
    }
  }

  function handleRetry() {
    if (resolvedSlug && resolvedSlug !== INBOUND_SLUG) loadPage(resolvedSlug);
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

      {isInbound ? (
        intakeLoading ? (
          <Center
            style={{
              flex: 1,
              flexDirection: "column",
              gap: 12,
              background: "#141414",
            }}
          >
            <Loader color="red" size="md" />
            <Text size="sm" c="#666">
              Loading intake items…
            </Text>
          </Center>
        ) : intakeError ? (
          <Center
            style={{
              flex: 1,
              flexDirection: "column",
              gap: 12,
              background: "#141414",
            }}
          >
            <Text size="sm" c="#ef4444" fw={600}>
              Failed to load intake items
            </Text>
            <Text size="xs" c="#666">
              {intakeError}
            </Text>
            <Button
              size="sm"
              onClick={reload}
              leftSection={<IconRefresh size={14} />}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Retry
            </Button>
          </Center>
        ) : (
          <>
            <ItemHeader item={selectedItem} />
            <Box
              style={{
                display: "flex",
                flex: 1,
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              <LeftRail
                items={items}
                stats={stats}
                selectedId={selectedItem?.id}
                onSelect={setSelectedId}
              />
              <CenterPanel item={selectedItem} />
              <RightPanel item={selectedItem} />
            </Box>
          </>
        )
      ) : (
        <PageContent
          pageData={pageData}
          loading={pageLoading}
          error={pageError}
          slug={slug}
          onRetry={handleRetry}
        />
      )}
    </Box>
  );
}
