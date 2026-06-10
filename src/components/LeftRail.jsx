import { useState, useMemo } from 'react'
import { Box, Text, Group, Badge, ScrollArea } from '@mantine/core'
import { confColor, fmtTime, srcBadge } from '../data'

export default function LeftRail({ items = [], stats = {}, selectedId, onSelect }) {
  const [tab, setTab] = useState('All')

  const railTabs = [
    { id: 'All',       label: `All ${stats.total ?? items.length}` },
    { id: 'review',    label: `Review ${stats.review ?? 0}` },
    { id: 'set_aside', label: `Set aside ${stats.set_aside ?? 0}` },
    // { id: 'auto',      label: `Auto ${stats.auto ?? 0}` },
  ]

  const filtered = useMemo(() =>
    tab === 'All' ? items : items.filter(i => i.status === tab),
    [tab, items]
  )

  return (
    <Box w={238} style={{ flexShrink: 0, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #e5e5e5' }}>
      {/* Header */}
      <Box px={12} pt={10} pb={7} style={{ borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
        <Group gap={7} mb={3}>
          <Text size="xs" fw={700} style={{ letterSpacing: '1.2px', textTransform: 'uppercase', color: '#111' }}>INBOUND</Text>
          <Badge size="xs" style={{ background: '#dc2626', color: '#fff', fontSize: 10 }}>{stats.total ?? items.length}</Badge>
        </Group>
        <Text size="xs" c="#aaa">Today · last 24h</Text>
      </Box>

      {/* Tabs */}
      <Group gap={2} p={8} style={{ borderBottom: '1px solid #e5e5e5', flexShrink: 0, flexWrap: 'wrap' }}>
        {railTabs.map(t => (
          <Box key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '3px 8px', fontSize: 11,
            color: tab === t.id ? '#111' : '#999', cursor: 'pointer',
            borderRadius: 3, background: tab === t.id ? '#f0f0f0' : 'transparent',
            fontWeight: tab === t.id ? 600 : 400, whiteSpace: 'nowrap',
            transition: 'background .12s, color .12s',
          }}>
            {t.label}
          </Box>
        ))}
      </Group>

      {/* Item list */}
      <ScrollArea flex={1} style={{ minHeight: 0 }}>
        {filtered.length === 0 && (
          <Box px={12} py={20} style={{ textAlign: 'center' }}>
            <Text size="xs" c="#ccc">No items</Text>
          </Box>
        )}
        {filtered.map(item => {
          const sb = srcBadge(item.source_type)
          const isSelected = selectedId === item.id
          return (
            <Box key={item.id} onClick={() => onSelect(item.id)} style={{
              padding: '13px 14px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
              background: isSelected ? '#fef2f2' : '#fff',
              borderLeft: isSelected ? '2px solid #dc2626' : '2px solid transparent',
              transition: 'background .12s',
            }}>
              <Group justify="space-between" align="flex-start" mb={5} wrap="nowrap">
                <Text size="sm" fw={700} c="#111" style={{ lineHeight: 1.3 }}>{item.company}</Text>
                <Text size="xs" c="#bbb" style={{ whiteSpace: 'nowrap', marginLeft: 6, flexShrink: 0, marginTop: 1 }}>
                  {fmtTime(item.received_at)}
                </Text>
              </Group>
              <Text size="xs" c="#888" mb={8} style={{ lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.subject}
              </Text>
              <Group justify="space-between" align="center">
                <Box style={{ fontSize: 10, padding: '3px 7px', borderRadius: 3, fontWeight: 500, background: sb.bg, color: sb.color }}>
                  {item.source_type}
                </Box>
                <Group gap={4} align="center">
                  {item.failed > 0 && (
                    <Box style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 3, background: '#fee2e2', color: '#dc2626', minWidth: 18, textAlign: 'center' }}>
                      {item.failed}
                    </Box>
                  )}
                  {item.warn > 0 && (
                    <Box style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 3, background: '#fef3c7', color: '#d97706', minWidth: 18, textAlign: 'center' }}>
                      {item.warn}
                    </Box>
                  )}
                  <Text size="xs" fw={700} style={{ color: confColor(item.confidence) }}>
                    {item.confidence}%
                  </Text>
                </Group>
              </Group>
            </Box>
          )
        })}
      </ScrollArea>
    </Box>
  )
}