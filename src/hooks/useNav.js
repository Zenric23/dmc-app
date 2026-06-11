import { useState, useEffect } from "react";
import { fetchNavItems } from "../data";
import { useAppConfig } from "../contexts/AppConfigContext";

const INBOUND_SLUG = "apg-dmc-inbound";

const INBOUND_ITEM = {
  page_slug: INBOUND_SLUG,
  path: "/inbound",
  label: "Inbound",
  show_in_menu: true,
  display_order: 20,
  visible: true,
};

export function useNav() {
  const { config } = useAppConfig();
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config.appSlug) return;
    fetchNavItems(config.appSlug)
      .then((data) => setNavItems(data ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [config.appSlug]);

  const apiMenuItems = navItems.filter((n) => n.show_in_menu && n.visible);

  const menuItems = [
    INBOUND_ITEM,
    ...apiMenuItems.filter((n) => n.page_slug !== INBOUND_SLUG),
  ].sort((a, b) => a.display_order - b.display_order);

  const defaultItem =
    menuItems.find((n) => n.page_slug === INBOUND_SLUG) ?? menuItems[0] ?? null;

  return { navItems, menuItems, defaultItem, loading, error };
}
