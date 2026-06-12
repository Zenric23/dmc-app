import { Box, Text, Loader, Center, Code, ScrollArea, Group } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import DomainDataTable from './DomainDataTable'

// ── Section renderer for each top-level key in data.data ─────────────────────
function Section({ title, data }) {
  return (
    <Box style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
      <Box px={16} py={10} style={{ background: '#f9f9f9', borderBottom: '1px solid #ebebeb' }}>
        <Text size="xs" fw={700} style={{ letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>
          {title}
        </Text>
      </Box>
      <Box p={16}>
        <Code block style={{ fontSize: 11, lineHeight: 1.7, background: '#f7f7f7', border: '1px solid #ebebeb', borderRadius: 4, padding: 14, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#333' }}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Box>
    </Box>
  )
}

// ── Page identity badge ───────────────────────────────────────────────────────
function PageIdentityBar({ page }) {
  const identity = page?.identity || {}
  return (
    <Box px={24} pt={20} pb={14} style={{ background: '#fff', borderBottom: '1px solid #ebebeb', flexShrink: 0 }}>
      <Group justify="space-between" align="flex-end">
        <Box>
          <Group gap={8} mb={4} align="center">
            <Text fw={800} size="lg" c="#111">{identity.name || page?.identity?.page_slug}</Text>
            <Box style={{ fontSize: 10, padding: '2px 8px', borderRadius: 3, background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 600 }}>
              {page?.visible ? '● visible' : '○ hidden'}
            </Box>
          </Group>
          <Text size="xs" c="#aaa">{identity.description}</Text>
        </Box>
        <Box style={{ textAlign: 'right' }}>
          <Text size="xs" c="#bbb" style={{ fontFamily: 'monospace' }}>{identity.page_slug}</Text>
        </Box>
      </Group>
    </Box>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PageContent({ pageData, loading, error, slug, onRetry }) {
  // Empty — nothing selected yet
  if (!slug && !loading) {
    return (
      <Center style={{ flex: 1, flexDirection: 'column', gap: 10, background: '#f7f7f7' }}>
        <Text size="sm" c="#ccc" fw={600}>Select a page from the navigation</Text>
      </Center>
    )
  }

  // Loading
  if (loading) {
    return (
      <Center style={{ flex: 1, flexDirection: 'column', gap: 12, background: '#f7f7f7' }}>
        <Loader color="red" size="sm" />
        <Text size="xs" c="#aaa">Loading page details for <strong>{slug}</strong>…</Text>
      </Center>
    )
  }

  // Error
  if (error) {
    return (
      <Center style={{ flex: 1, flexDirection: 'column', gap: 10, background: '#f7f7f7' }}>
        <Text size="sm" c="#ef4444" fw={600}>Failed to load page</Text>
        <Text size="xs" c="#aaa">{error}</Text>
        <Box
          onClick={onRetry}
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#dc2626', cursor: 'pointer', marginTop: 4 }}
        >
          <IconRefresh size={13} /> Retry
        </Box>
      </Center>
    )
  }

  if (!pageData) return null

  // The API wraps in { result, data: { page, claims, data_access, actions } }
  const inner = pageData?.data || pageData
  const { page, claims, data_access, actions } = inner

  const domainSources = (Array.isArray(data_access) ? data_access : [data_access])
    .filter(s => s?.source_type === 'domain' && s?.domain)

  const sections = [
    { key: 'page',        title: 'Page Definition',  data: page },
    { key: 'claims',      title: 'Claims',            data: claims },
    { key: 'data_access', title: 'Data Access',       data: data_access },
    { key: 'actions',     title: 'Actions',           data: actions },
  ]

  return (
    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {page && <PageIdentityBar page={page} />}

      <ScrollArea flex={1} style={{ minHeight: 0, background: '#f7f7f7' }}>
        <Box p={24}>
          {sections.map(s => s.data != null && (
            <Section key={s.key} title={s.title} data={s.data} />
          ))}

          {/* Fallback: show full raw response if structure is unexpected */}
          {!page && !claims && !data_access && !actions && (
            <Section title="Raw Response" data={pageData} />
          )}

          {/* Domain data tables — one per domain source in data_access */}
          {domainSources.map(s => (
            <DomainDataTable key={s.domain} domain={s.domain} system={s.system || 'core'} />
          ))}
        </Box>
      </ScrollArea>
    </Box>
  )
}