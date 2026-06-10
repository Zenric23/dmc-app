import axios from "axios";

// ── API config ────────────────────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v3";
export const FILE_BASE_URL =
  import.meta.env.VITE_FILE_BASE_URL || "http://localhost:3000/files";

// ── Auth token via postMessage from portal ────────────────────────────────────
let _resolveToken;
const _tokenReady = new Promise((resolve) => { _resolveToken = resolve; });

globalThis.addEventListener("message", (event) => {
  if (event.data?.type === "AUTH_TOKEN" && event.data?.token) {
    _resolveToken(event.data.token);
  }
});

// ── Axios instance ────────────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await _tokenReady;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
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
  const res = await api.get(`/native-apps/test-app-10/resolve`);
  return res.data?.data.app?.pages;
}

export async function fetchPageDetails() {
  const { data } = await api.get(`/native-apps/test-app-10/pages/apg-test1/resolve`);
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
