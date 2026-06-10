import { useState, useEffect } from 'react'
import { fetchNavItems } from '../data'

const INBOUND_SLUG = 'apg-dmc-inbound'

const INBOUND_ITEM = {
  page_slug: INBOUND_SLUG,
  path: '/inbound',
  label: 'Inbound',
  show_in_menu: true,
  display_order: 20,
  visible: true,
}

export function useNav() {
  const [navItems, setNavItems] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetchNavItems()
      .then(data => setNavItems(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const apiMenuItems = navItems.filter(n => n.show_in_menu && n.visible)

  // Always include inbound; deduplicate if the API also returns it
  const menuItems = [
    INBOUND_ITEM,
    ...apiMenuItems.filter(n => n.page_slug !== INBOUND_SLUG),
  ].sort((a, b) => a.display_order - b.display_order)

  // Default to inbound, fall back to first item
  const defaultItem =
    menuItems.find(n => n.page_slug === INBOUND_SLUG) ??
    menuItems[0] ??
    null

  return { navItems, menuItems, defaultItem, loading, error }
}