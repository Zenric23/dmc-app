import { useState, useEffect, useCallback } from "react";
import { fetchIntakeItems } from "../data";

export function useIntakeItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIntakeItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = {
    total: items.length,
    review: items.filter((i) => i.status === "review").length,
    set_aside: items.filter((i) => i.status === "set_aside").length,
    auto: items.filter((i) => i.status === "auto").length,
  };

  return { items, loading, error, stats, reload: load };
}
