import { useState, useCallback } from "react";
import { fetchPageDetails } from "../data";

export function usePageDetails() {
  const [pageData, setPageData] = useState(null); // full API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState(null);

  const loadPage = useCallback(async (pageSlug) => {
    if (!pageSlug) return;
    setSlug(pageSlug);
    setLoading(true);
    setError(null);
    setPageData(null);
    try {
      const res = await fetchPageDetails(pageSlug);
      setPageData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { pageData, loading, error, slug, loadPage };
}
