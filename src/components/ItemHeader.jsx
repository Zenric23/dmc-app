import { Box, Text, Group, Button } from '@mantine/core'
import { IconDownload, IconUser, IconStar } from '@tabler/icons-react'
import { confColor, srcBadge } from '../data'

export default function ItemHeader({ item }) {
  if (!item) return null

  const sb = srcBadge(item.source_type)

  return (
    <>
      {/* Breadcrumb */}
      <Box
        px={16}
        py={5}
        style={{ background: '#fff', fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}
      >
        <Text component="span" style={{ color: '#666', cursor: 'pointer', fontSize: 11 }}>Inbound</Text>
        <Text component="span" c="#ccc">›</Text>
        <Text component="span" style={{ color: '#555', fontSize: 11 }}>{item.primary_file_id || item.subject}</Text>
      </Box>

      {/* Item header */}
      <Box px={16} pt={6} pb={8} style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
        <Group gap={10} mb={5} style={{ flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 19, fontWeight: 900, color: '#111', letterSpacing: '-.3px', textTransform: 'uppercase' }}>
            {item.company}
          </Text>
          {item.primary_file_id && (
            <Box style={{ background: '#fff', border: '2px solid #111', color: '#111', fontSize: 12, fontWeight: 800, padding: '2px 10px', borderRadius: 3 }}>
              {item.primary_file_id.replace('.pdf', '')}
            </Box>
          )}
          <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: '1.5px solid #d97706', color: '#92400e', background: '#fffbeb', whiteSpace: 'nowrap' }}>
            ● {item.status}
          </Box>
          <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: sb.bg, color: sb.color, border: `1.5px solid ${sb.color}`, whiteSpace: 'nowrap' }}>
            ● {item.source_type}
          </Box>
          <Group gap={6} ml="auto">
            <Button variant="default" size="compact-sm" leftSection={<IconDownload size={12} />} style={{ fontSize: 11 }}>
              Export
            </Button>
            <Button variant="default" size="compact-sm" leftSection={<IconUser size={12} />} style={{ fontSize: 11 }}>
              Assign...
            </Button>
          </Group>
        </Group>

        {/* Meta row */}
        <Group gap={14} style={{ fontSize: 11, color: '#777', flexWrap: 'wrap' }}>
          <Text size="xs"><Text component="span" size="xs" fw={600} c="#555">Doc type:</Text> {item.source_type}</Text>
          <MetaSep />
          <Text size="xs"><Text component="span" size="xs" fw={600} c="#555">Received:</Text> 32 min ago · {new Date(item.received_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
          <MetaSep />
          <Text size="xs"><Text component="span" size="xs" fw={600} c="#555">From:</Text> {item.sender}</Text>
          <MetaSep />
          <Text size="xs"><Text component="span" size="xs" fw={600} c="#555">Assignee:</Text> M. Alvarez</Text>
          <MetaSep />
          <Group gap={6} align="center">
            <Text size="xs" fw={600} c="#555">Overall:</Text>
            <Box style={{ width: 76, height: 5, background: '#e5e5e5', borderRadius: 3, overflow: 'hidden' }}>
              <Box style={{ height: '100%', width: `${item.confidence}%`, background: confColor(item.confidence), borderRadius: 3 }} />
            </Box>
            <Text size="xs" fw={700} style={{ color: confColor(item.confidence) }}>{item.confidence}%</Text>
          </Group>
        </Group>
      </Box>

      {/* Recommendation banner */}
      <Group
        px={16}
        py={6}
        gap={10}
        style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', flexShrink: 0, flexWrap: 'nowrap' }}
      >
        <Group gap={4} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <IconStar size={10} color="#d97706" />
          <Text style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1.2px', color: '#d97706', textTransform: 'uppercase' }}>Recommendation</Text>
        </Group>
        <Text size="xs" c="#666">
          Set aside — <strong>3 blocking failures</strong>, <strong>5 warnings</strong>. Resolve or override before approving.
        </Text>
        <Group gap={12} ml="auto" style={{ flexShrink: 0 }}>
          <Text size="xs" style={{ color: '#ef4444', cursor: 'pointer' }}>3 failed</Text>
          <Text size="xs" style={{ color: '#f59e0b', cursor: 'pointer' }}>5 warning</Text>
          <Text size="xs" style={{ color: '#888', cursor: 'pointer' }}>1 review</Text>
        </Group>
      </Group>
    </>
  )
}

function MetaSep() {
  return <Text c="#d5d5d5">|</Text>
}
