import axios from "axios";

// ── API config ────────────────────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v3";
export const FILE_BASE_URL =
  import.meta.env.VITE_FILE_BASE_URL || "http://localhost:3000/files";

export const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IndoMDZzRWt6TEhKNXNOTmFVeVJZMl82TzhLMCJ9.eyJhdWQiOiIzMDQzZTlkMy0yOGU2LTQwMDItYWIzMS1jMDdmY2Y0MTgyMDUiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMzlmNmNmNWUtNzI1ZC00MDg3LWExZTMtZTdiNDQ0MmM4NjdlL3YyLjAiLCJpYXQiOjE3ODEwNjI3NzMsIm5iZiI6MTc4MTA2Mjc3MywiZXhwIjoxNzgxMDY4MzgxLCJhaW8iOiJBYVFBVy84Y0FBQUExNWV5TlZMRk9BMm1EQk1tZGlUd0wxdCtaODY3all2TndVaXBjdWpGTTVSSFUrSVhGY1NMbGtKYW82UDV2VnRtS3JGQlIvQ1h6VnFoeUgwVmZtK2ZMNnc3cm91K0YxZG8wVW5WbWt3U3dFSm54QzNXOVNkbHNORC94NUVMM1NydktsVmpJOGVwMmRMQm9SbXAybGNYcWZCSEZJdUsxT0dib0hNS3NXNkpqNGJ3bnlPVVRkT0RRcUhPWWlxRURxbjBHV290Um5aVHNIai9qeWlBUUFKVmNBPT0iLCJhenAiOiIzMDQzZTlkMy0yOGU2LTQwMDItYWIzMS1jMDdmY2Y0MTgyMDUiLCJhenBhY3IiOiIwIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGVlZWJjYTYtZDZmNS00MTY0LWE0ZDEtOTgwNDJiYjJiMmY0LyIsIm5hbWUiOiJaZW5yaWMgQ2xhcmV0ZSIsIm9pZCI6IjI0N2QzMTRmLTM4MjQtNGQyYi1hNzQ4LWNlNmNkMjFlYWE0ZiIsInByZWZlcnJlZF91c2VybmFtZSI6InplbnJpYy5jbGFyZXRlQHBpdm90bHkuY29tIiwicmgiOiIxLkFSNEFYc18yT1YxeWgwQ2g0LWUwUkN5R2Z0UHBRekRtS0FKQXF6SEFmODlCZ2dVQUFNQWVBQS4iLCJzY3AiOiJhcGkucmVhZCIsInNpZCI6IjAwMzI4OTlhLWM5YzUtZGFhOS0zMzU5LTUzNmY5YTQ1NmQxZCIsInN1YiI6ImlUbkhHd1RuUHkxYkRRZHJMajdySndwWnVkTmJzV3RWZEw1Q1M0V0tzdTQiLCJ0aWQiOiIzOWY2Y2Y1ZS03MjVkLTQwODctYTFlMy1lN2I0NDQyYzg2N2UiLCJ1dGkiOiJYZTVyMGFyNEtFNnE4VTZFRllXUkFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IjFTa3FOTnlDNnVmZFp6RVNNYTY5b0xESFVPdWN4TGQybC0xS1BsNGgzQ1lCZFhOM1pYTjBNeTFrYzIxeiJ9.BjjtTswd5gSJSJVI_3uGvk-Y86BQ_Hk7XJwQC83ZisICe4YIdcmbdNr5ncZZEUMgwFU_PT8FYIumuBPTvmNSlRxN4jOFeDvburWWldeKgpeqT43LtmfZxWLawvG6jH_g6Wiai7s6jx4qY50z1uzlmSGBKUHP-VVaaLQM4Guf-onPaMv0Lrk7OPyVHiYp74upjqx5SfTNXs-Miq7pdLnqCg4QMlGBEfC3behoTSMuzUkYqGK7ev33fdjexVLj76kZoLPNbRNliTAY7AjtEqVMvVPb2_YNTrbk5nzPARPmz7hbYzXpiqEeetfzrWuENkzBfqdJekf7LYXnGKuxM89ieQ";

// ── Axios instance ────────────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

// ── Transform a single raw API record → app shape ────────────────────────────
export function transformItem(raw) {
  const details = raw.detailsS
    ? typeof raw.details === "string"
      ? JSON.parse(raw.details)
      : raw.details
    : null;

  const conf = details?.header?.overall_confidence ?? 71;

  let failed = 0,
    warn = 0;
  if (details?.checks) {
    details.checks.forEach((c) => {
      if (c.status === "failed") failed++;
      else if (c.status === "warning") warn++;
    });
  }

  return {
    id: raw.id,
    subject: raw.subject,
    sender: raw.sender,
    sender_name: raw.sender_name,
    company: raw.company,
    received_at: raw.recieved_at || raw.received_at || null,
    status: raw.status,
    summary: raw.summary,
    source_type: raw.source_type,
    primary_file_id: raw.file_logical_name || null,
    file_id: raw.file_id || null,
    file_storage_path: raw.file_storage_path || null,
    file_url: raw.file_storage_path
      ? `${FILE_BASE_URL}${raw.file_storage_path}`
      : null,
    confidence: conf,
    failed,
    warn,
    details,
  };
}

// ── API calls ─────────────────────────────────────────────────────────────────
export async function fetchNavItems() {
  const res = await api.get(`/native-apps/dmc-v1/resolve`);
  return res.data?.data.app?.pages;
}

export async function fetchPageDetails() {
  const { data } = await api.get(`/native-apps/dmc-v1/pages/apg-intake-items-page/resolve`);
  console.log("Fetched page details:", data);
  return data;
}

export async function fetchIntakeItems() {
  const { data } = await api.get("/apps/intake-items");
  console.log("Fetched intake items:", data);
  return data.map(transformItem);
}

// ── Detail accessor ───────────────────────────────────────────────────────────
export function getDetailData(item) {
  return item?.details ?? null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function confColor(p) {
  return p >= 85 ? "#22c55e" : p >= 70 ? "#f59e0b" : "#ef4444";
}

export function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toTimeString().slice(0, 5);
}

export function srcBadge(t) {
  const m = {
    "Purchase Order": { bg: "#dbeafe", color: "#1d4ed8" },
    "Quote Request": { bg: "#dcfce7", color: "#166534" },
    "Revised PO": { bg: "#ede9fe", color: "#6d28d9" },
    "Change Request": { bg: "#fef3c7", color: "#92400e" },
    Invoice: { bg: "#fee2e2", color: "#991b1b" },
    "Not relevant": { bg: "#f3f4f6", color: "#6b7280" },
  };
  return m[t] || { bg: "#f3f4f6", color: "#6b7280" };
}
