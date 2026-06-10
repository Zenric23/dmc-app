import { Group, ActionIcon, Avatar, Text, Box } from '@mantine/core'
import { IconBell, IconSettings } from '@tabler/icons-react'

export default function TopNav({ activePage, onPage, stats = {} }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inbound',   label: 'Inbound',   badge: stats.total,     badgeColor: 'red' },
    { id: 'review',    label: 'Review',    badge: stats.review,    badgeColor: 'gray' },
    { id: 'setaside',  label: 'Set Aside', badge: stats.set_aside, badgeColor: 'orange' },
    { id: 'approved',  label: 'Approved' },
    { id: 'admin',     label: 'Admin' },
  ]

  return (
    <Box h={40} style={{ background: '#141414', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', paddingLeft: 12, flexShrink: 0, zIndex: 100 }}>
      {/* Logo */}
      <Group gap={0} mr={4}>
        <Box style={{ background: '#dc2626', color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: '.5px', padding: '3px 8px', borderRadius: 3 }}>
          DMC
        </Box>
        <Text size="xs" style={{ color: '#666', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', borderLeft: '1px solid #333', paddingLeft: 10, marginLeft: 8 }}>
          Intakes
        </Text>
      </Group>

      {navItems.map(n => (
        <Box key={n.id} onClick={() => onPage(n.id)} style={{
          height: 40, display: 'flex', alignItems: 'center', padding: '0 14px',
          color: activePage === n.id ? '#fff' : '#888',
          fontSize: 11, fontWeight: 600, letterSpacing: '.5px', cursor: 'pointer',
          borderBottom: activePage === n.id ? '2px solid #dc2626' : '2px solid transparent',
          textTransform: 'uppercase', gap: 5, transition: 'color .15s',
        }}>
          {n.label}
          {n.badge != null && n.badge > 0 && (
            <Box style={{
              background: n.badgeColor === 'orange' ? '#d97706' : n.badgeColor === 'gray' ? '#444' : '#dc2626',
              color: '#fff', fontSize: 10, fontWeight: 700, minWidth: 18, padding: '1px 5px', borderRadius: 10,
              textAlign: 'center',
            }}>
              {n.badge}
            </Box>
          )}
        </Box>
      ))}

      <Group gap={10} ml="auto" pr={14}>
        <Group gap={5}>
          <Box style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <Text size="xs" c="#666">Sightline connected</Text>
        </Group>
        <ActionIcon variant="subtle" color="gray" size="sm"><IconBell size={15} color="#666" /></ActionIcon>
        <ActionIcon variant="subtle" color="gray" size="sm"><IconSettings size={15} color="#666" /></ActionIcon>
        <Avatar size={28} style={{ background: '#dc2626', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>MA</Avatar>
      </Group>
    </Box>
  )
}