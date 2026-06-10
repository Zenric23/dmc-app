import { useState, useEffect, useRef } from "react";
import { Box, Group, Text, Button } from "@mantine/core";
import {
  IconFile,
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconPaperclip,
  IconSearch,
  IconDownload,
  IconMail,
  IconFileOff,
} from "@tabler/icons-react";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "./Pdfdocument";
import { api } from "../data";

// ── PDF Preview ───────────────────────────────────────────────────────────────
function PdfPreview({ fileId }) {
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const prevUrl = useRef(null);

  // Only generate a PDF if there's no real file URL
  useEffect(() => {
    if (!fileId) return;
    let cancelled = false;
    // pdf(<PdfDocument />)
    //   .toBlob()
    //   .then((blob) => {
    //     if (cancelled) return;
    //     const objectUrl = URL.createObjectURL(blob);
    //     if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    //     prevUrl.current = objectUrl;
    //     setGeneratedUrl(objectUrl);
    //   });

    const getFileUrl = async () => {
      const res = await api.get(`/files/${fileId}/preview`, {
        responseType: "blob",
      });

      const objectUrl = URL.createObjectURL(res.data);
      console.log("objectUrl", objectUrl);
      if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
      prevUrl.current = objectUrl;
      setGeneratedUrl(objectUrl);
    };

    getFileUrl();

    return () => {
      cancelled = true;
    };
  }, [fileId]);

  // const src = fileId || generatedUrl
  const src = generatedUrl;

  if (!src) {
    return (
      <Box
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e1e1e",
        }}
      >
        <Box style={{ textAlign: "center" }}>
          <Box
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#2a2a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
            }}
          >
            <IconFile size={16} color="#555" />
          </Box>
          <Text size="xs" c="#555">
            Generating PDF preview…
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <iframe
      src={src}
      title="PDF Preview"
      style={{
        flex: 1,
        width: "100%",
        border: "none",
        display: "block",
        minHeight: 0,
      }}
    />
  );
}

// ── No File Empty State ───────────────────────────────────────────────────────
function NoPdfState() {
  return (
    <Box
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e1e1e",
        gap: 10,
      }}
    >
      <Box
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconFileOff size={22} color="#444" />
      </Box>
      <Text size="sm" c="#555" fw={600}>
        No file to preview
      </Text>
      <Text size="xs" c="#3a3a3a">
        This intake item has no attachment
      </Text>
    </Box>
  );
}

// ── Email Card ────────────────────────────────────────────────────────────────
function EmailCard({ item }) {
  const [collapsed, setCollapsed] = useState(false);

  const openPdf = async (fileId) => {
    const res = await axios.get(`${API_BASE_URL}/files/${fileId}/preview`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const objectUrl = URL.createObjectURL(res.data);
    window.open(objectUrl, "_blank");
  };

  return (
    <Box
      style={{
        background: "#fff",
        flexShrink: 0,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Card header */}
      <Group
        justify="space-between"
        px={14}
        py={9}
        style={{ borderBottom: collapsed ? "none" : "1px solid #f0f0f0" }}
      >
        <Group gap={7}>
          <IconMail size={13} color="#777" />
          <Text size="xs" fw={600} c="#333">
            Inbound email
          </Text>
          <Box
            style={{
              background: "#ecfdf5",
              border: "1px solid #22c55e",
              color: "#166534",
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: 3,
            }}
          >
            ● Relevant — 98%
          </Box>
        </Group>
        <Button
          variant="default"
          size="compact-xs"
          onClick={() => setCollapsed((c) => !c)}
          style={{ fontSize: 11 }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </Button>
      </Group>

      {!collapsed && (
        <>
          {/* Meta grid */}
          <Box
            px={14}
            py={8}
            style={{
              display: "grid",
              gridTemplateColumns: "58px 1fr",
              gap: "3px 10px",
            }}
          >
            {[
              ["From", `${item.sender_name} <${item.sender}>`],
              ["To", "orders@dmctools.com"],
              ["Subject", item.subject],
              [
                "Date",
                new Date(item.received_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
              ],
              ["Body", item.summary],
            ].map(([l, v]) => (
              <>
                <Text key={`l-${l}`} size="xs" c="#aaa" fw={500}>
                  {l}
                </Text>
                <Text
                  key={`v-${l}`}
                  size="xs"
                  c="#333"
                  style={{
                    lineHeight: 1.5,
                    fontWeight: l === "Subject" ? 600 : 400,
                  }}
                >
                  {v}
                </Text>
              </>
            ))}
          </Box>

          {/* Attachments */}
          {item.primary_file_id && (
            <Box
              px={14}
              py={8}
              style={{
                borderTop: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                gap: 7,
                flexWrap: "wrap",
              }}
            >
              <Text size="xs" c="#bbb" mr={4}>
                Attachment:
              </Text>
              <Box onClick={() => openPdf(item.file_id)}>
                <AttachChip
                  name={item.primary_file_id || "attachment.pdf"}
                  size="412 KB · 3p"
                  primary
                />
              </Box>
              {/* <AttachChip name="LM_Procurement_T&Cs_Rev12.pdf" size="1.1 MB · 24p" /> */}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

// ── Main Center Panel ─────────────────────────────────────────────────────────
export default function CenterPanel({ item }) {
  console.log("item", item);
  if (!item) {
    return (
      <Box
        flex={1}
        style={{
          background: "#252525",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Text c="#555" size="sm" fw={600}>
          Select an intake item
        </Text>
      </Box>
    );
  }

  const hasPdf =
    Boolean(item.file_url || item.primary_file_id) &&
    item.source_type !== "Not relevant";

  return (
    <Box
      flex={1}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#252525",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <Group
        h={36}
        px={10}
        gap={6}
        style={{
          background: "#1e1e1e",
          borderBottom: "1px solid #141414",
          flexShrink: 0,
          flexWrap: "nowrap",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11.5,
            fontWeight: 700,
            color: hasPdf ? "#dc2626" : "#555",
            background: "#141414",
            padding: "3px 8px",
            borderRadius: 3,
            border: "1px solid #2a2a2a",
            maxWidth: 220,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <IconFile size={12} />
          {item.primary_file_id || "No attachment"}
        </Box>

        {/* {hasPdf && (
          <>
            <TbBtn><IconChevronLeft size={12} /></TbBtn>
            <Text size="xs" c="#666" style={{ whiteSpace: 'nowrap' }}>Page 1 / 3</Text>
            <TbBtn><IconChevronRight size={12} /></TbBtn>

            <Box style={{ width: 1, height: 18, background: '#333', flexShrink: 0 }} />

            <TbBtn><IconMinus size={12} /></TbBtn>
            <Text size="xs" c="#666">100%</Text>
            <TbBtn><IconPlus size={12} /></TbBtn>

            <Box style={{ width: 1, height: 18, background: '#333', flexShrink: 0 }} />

            <Text size="xs" c="#666" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconPaperclip size={12} /> 2 attachments
            </Text>
          </>
        )} */}

        <Group gap={5} ml="auto">
          <TbBtn>
            <IconSearch size={12} />
          </TbBtn>
          {hasPdf && (
            <TbBtn>
              <IconDownload size={12} />
            </TbBtn>
          )}
        </Group>
      </Group>

      {/* Email card — always visible, above PDF */}
      <EmailCard item={item} />

      {/* PDF viewer fills remaining space */}
      {hasPdf ? <PdfPreview fileId={item.file_id} /> : <NoPdfState />}
    </Box>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function TbBtn({ children }) {
  return (
    <Box
      style={{
        width: 26,
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #333",
        borderRadius: 3,
        background: "#272727",
        color: "#888",
        cursor: "pointer",
        fontSize: 12,
        transition: "background .12s, color .12s",
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function AttachChip({ name, size, primary }) {
  return (
    <Box
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: 4,
        padding: "3px 8px",
        fontSize: 10.5,
        color: "#b91c1c",
        cursor: "pointer",
        lineHeight: 1,
      }}
    >
      <IconFile size={11} style={{ flexShrink: 0 }} />
      <Text component="span" style={{ fontSize: 10.5, color: "#b91c1c" }}>
        {name}
      </Text>
      <Text
        component="span"
        style={{ fontSize: 10, color: "#aaa", marginLeft: 2 }}
      >
        {size}
      </Text>
      {primary && (
        <Box
          style={{
            background: "#dc2626",
            color: "#fff",
            fontSize: 9,
            padding: "1px 4px",
            borderRadius: 2,
            marginLeft: 3,
            lineHeight: 1.4,
          }}
        >
          primary
        </Box>
      )}
    </Box>
  );
}
