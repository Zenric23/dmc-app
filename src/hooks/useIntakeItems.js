import { useState, useEffect, useCallback } from "react";
import { fetchDomainRecords, transformItem } from "../data";
import { useAppConfig } from "../contexts/PivotlyAppConfigContext";

export function useIntakeItems({ domain, system }) {
  const { ready, config } = useAppConfig();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchDomainRecords({
        domain,
        system,
        appSlug: config.appSlug,
      });
      setItems(data.map(transformItem));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [config.appSlug, domain, system]);

  useEffect(() => {
    if (!ready) return;
    load();
  }, [ready, load]);

  const stats = {
    total: items.length,
    review: items.filter((i) => i.status === "review").length,
    set_aside: items.filter((i) => i.status === "set_aside").length,
    auto: items.filter((i) => i.status === "auto").length,
  };

  return { items, loading, error, stats, reload: load };
}
