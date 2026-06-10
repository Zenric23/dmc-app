import { useState } from 'react'
import { Box, Text, Group, ScrollArea, Button } from '@mantine/core'
import { IconCheck, IconRefresh, IconX } from '@tabler/icons-react'
import { getDetailData, confColor } from '../data'

function ChecksPanel({ d }) {
  return (
    <Box>
      <Box p={14} style={{ background: '#161616', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          ['Customer', d.header.customer],
          ['Document Type', d.header.document_type],
          ['Sightline Account', d.header.sightline_account],
          ['PO / RFO Number', d.header.po_number],
        ].map(([lbl, val]) => (
          <Box key={lbl}>
            <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', color: '#555', marginBottom: 3 }}>{lbl}</Text>
            <Text style={{ fontSize: lbl === 'Sightline Account' ? 11 : 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{val}</Text>
          </Box>
        ))}
      </Box>

      <Box px={14} py={12} style={{ background: '#161616', borderTop: '1px solid #252525', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Box style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 1, color: confColor(d.header.overall_confidence) }}>
          {d.header.overall_confidence}<Text component="span" size="sm">%</Text>
        </Box>
        <Box flex={1}>
          <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', color: '#666', marginBottom: 2 }}>Overall Confidence</Text>
          <Text style={{ fontSize: 11, color: '#999', marginBottom: 6, lineHeight: 1.4 }}>{d.header.overall_status}</Text>
          <Button size="compact-xs" style={{ background: '#d97706', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 3, border: 'none' }}>
            ● {d.header.action_label}
          </Button>
        </Box>
      </Box>

      <Box py={6}>
        {d.checks.length === 0 ? (
          <Box px={14} py={12}>
            <Text size="xs" c="#aaa">No checks available for this item.</Text>
          </Box>
        ) : d.checks.map(c => {
          const iconStyle = c.status === 'passed' ? { bg: '#dcfce7', color: '#166534' }
            : c.status === 'warning' ? { bg: '#fef3c7', color: '#92400e' }
            : { bg: '#fee2e2', color: '#991b1b' }
          const pillStyle = c.status === 'passed' ? { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' }
            : c.status === 'warning' ? { bg: '#fef3c7', color: '#92400e', border: '#fde68a' }
            : { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' }
          const fillCol = c.status === 'passed' ? '#22c55e' : c.status === 'warning' ? '#f59e0b' : '#ef4444'
          return (
            <Box key={c.id} px={12} py={8} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, borderBottom: '1px solid #f7f7f7' }}>
              <Box style={{ width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, background: iconStyle.bg, color: iconStyle.color, fontSize: 11, fontWeight: 700 }}>
                {c.status === 'passed' ? '✓' : c.status === 'warning' ? '!' : '✕'}
              </Box>
              <Box flex={1} style={{ minWidth: 0 }}>
                <Group gap={5} mb={2} style={{ flexWrap: 'wrap' }}>
                  <Text size="xs" fw={600} c="#111">{c.label}</Text>
                  {c.tag && (
                    <Box style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.5px', padding: '1px 5px', borderRadius: 2, background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}>{c.tag}</Box>
                  )}
                </Group>
                <Text style={{ fontSize: 11, color: '#999', lineHeight: 1.4 }}>{c.desc}</Text>
              </Box>
              <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <Box style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap', background: pillStyle.bg, color: pillStyle.color, border: `1px solid ${pillStyle.border}` }}>
                  ● {c.status === 'passed' ? 'Passed' : c.status === 'warning' ? 'Warning' : 'Failed'}
                </Box>
                <Box style={{ width: 60, height: 4, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                  <Box style={{ height: '100%', width: `${c.score}%`, background: fillCol, borderRadius: 2 }} />
                </Box>
                <Text style={{ fontSize: 10, color: '#bbb' }}>{c.score}%</Text>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function FieldsPanel({ d }) {
  return (
    <Box pt={6}>
      {d.fields.map((f, i) => (
        <Box key={i} px={12} py={6} style={{ display: 'grid', gridTemplateColumns: '118px 1fr', gap: 8, borderBottom: '1px solid #f7f7f7', alignItems: 'start' }}>
          <Text style={{ fontSize: 11, color: '#aaa', fontWeight: 500 }}>{f.label}</Text>
          <Box style={{ display: 'flex', alignItems: 'flex-start', gap: 5, flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 11, color: '#111', fontWeight: 500 }}>{f.value}</Text>
            <Box style={{
              fontSize: 9, padding: '1px 4px', borderRadius: 2, fontWeight: 600, flexShrink: 0, marginTop: 1,
              background: f.conf === 'high' ? '#dcfce7' : f.conf === 'medium' ? '#fef3c7' : '#fee2e2',
              color: f.conf === 'high' ? '#166534' : f.conf === 'medium' ? '#92400e' : '#991b1b',
            }}>{f.conf}</Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

function LinesPanel({ d }) {
  if (!d.lines || d.lines.length === 0) {
    return <Box px={14} py={12}><Text size="xs" c="#aaa">No line items available.</Text></Box>
  }
  const total = d.lines.reduce((s, l) => s + l.total, 0)
  return (
    <Box style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
        <thead>
          <tr>
            {['#', 'Part No.', 'Description', 'Qty', 'UOM', 'Unit $', 'Total', 'Need-by'].map(h => (
              <th key={h} style={{ background: '#f5f5f5', padding: '7px 8px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: '.3px', textTransform: 'uppercase', borderBottom: '1px solid #ebebeb', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d.lines.map(l => (
            <tr key={l.line}>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', color: '#333', verticalAlign: 'top' }}>
                <Box component="span" style={{ width: 7, height: 7, borderRadius: '50%', display: 'inline-block', marginRight: 4, background: l.status === 'ok' ? '#22c55e' : '#f59e0b' }} />
                {l.line}
              </td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', fontFamily: 'monospace', fontSize: 10, verticalAlign: 'top' }}>{l.pn}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', maxWidth: 100, verticalAlign: 'top' }}>{l.desc}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', textAlign: 'right', verticalAlign: 'top' }}>{l.qty}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', verticalAlign: 'top' }}>{l.uom}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', textAlign: 'right', verticalAlign: 'top' }}>${l.up.toFixed(2)}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', textAlign: 'right', fontWeight: 600, verticalAlign: 'top' }}>${l.total.toFixed(2)}</td>
              <td style={{ padding: '7px 8px', borderBottom: '1px solid #f5f5f5', whiteSpace: 'nowrap', color: '#d97706', verticalAlign: 'top' }}>{l.nb}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={6} style={{ textAlign: 'right', fontWeight: 700, color: '#333', padding: '8px 8px' }}>Total</td>
            <td style={{ fontWeight: 700, textAlign: 'right', color: '#111', padding: '8px 8px' }}>${total.toFixed(2)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </Box>
  )
}

function PayloadPanel({ d }) {
  if (!d.payload || Object.keys(d.payload).length === 0) {
    return <Box px={14} py={12}><Text size="xs" c="#aaa">No payload data available.</Text></Box>
  }
  const lines = Object.entries(d.payload).map(([k, v]) => {
    const isStr = typeof v === 'string'
    const isNum = typeof v === 'number'
    const valHtml = isStr
      ? `<span style="color:#f9c74f">"${v}"</span>`
      : isNum ? `<span style="color:#a3e4d7">${v}</span>`
      : `<span style="color:#c3b5fd">${v}</span>`
    return `  <span style="color:#67d4f8">"${k}"</span>: ${valHtml}`
  })
  return (
    <Box p={14}>
      <Text size="xs" c="#aaa" mb={8} fw={500}>Extracted payload JSON</Text>
      <Box style={{ background: '#111', borderRadius: 5, padding: 14, fontFamily: "'Fira Code','Courier New',monospace", fontSize: 11, color: '#a3e4d7', lineHeight: 1.75, overflowX: 'auto', whiteSpace: 'pre' }}
        dangerouslySetInnerHTML={{ __html: `{\n${lines.join(',\n')}\n}` }}
      />
    </Box>
  )
}

function AuditPanel({ d }) {
  const userColors = { sys: '#aaa', ai: '#2563eb', human: '#d97706' }
  if (!d.audit || d.audit.length === 0) {
    return <Box px={14} py={12}><Text size="xs" c="#aaa">No audit trail available.</Text></Box>
  }
  return (
    <Box p={14}>
      <Text size="xs" c="#aaa" mb={10} fw={600}>Audit trail</Text>
      {d.audit.map((e, i) => (
        <Box key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap', paddingTop: 2, minWidth: 30 }}>{e.time}</Text>
          <Box style={{ width: 1, background: '#ebebeb', alignSelf: 'stretch' }} />
          <Box>
            <Text style={{ fontSize: 10, fontWeight: 700, marginBottom: 2, color: userColors[e.type] || '#aaa' }}>{e.user}</Text>
            <Text style={{ fontSize: 11, color: '#555' }}>{e.action}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default function RightPanel({ item }) {
  const [tab, setTab] = useState('CHECKS')

  if (!item) {
    return (
      <Box w={374} style={{ flexShrink: 0, background: '#fff', borderLeft: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text size="xs" c="#ccc">Select an item to view details</Text>
      </Box>
    )
  }

  const d = getDetailData(item)

  const tabs = [
    { id: 'CHECKS',  label: 'Checks',  badge: d?.checks?.length || 0 },
    { id: 'FIELDS',  label: 'Fields',  badge: null },
    { id: 'LINES',   label: 'Lines',   badge: d?.lines?.length || 0, dim: true },
    { id: 'PAYLOAD', label: 'Payload', badge: null },
    { id: 'AUDIT',   label: 'Audit',   badge: null },
  ]

  return (
    <Box w={374} style={{ flexShrink: 0, background: '#fff', borderLeft: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tabs */}
      <Box style={{ display: 'flex', borderBottom: '1px solid #ebebeb', background: '#fafafa', flexShrink: 0, overflowX: 'auto' }}>
        {tabs.map(t => (
          <Box key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '9px 12px', fontSize: 11, fontWeight: 600,
            color: tab === t.id ? '#111' : '#999', cursor: 'pointer',
            borderBottom: tab === t.id ? '2px solid #dc2626' : '2px solid transparent',
            transition: 'color .12s, border-color .12s',
            display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {t.label}
            {t.badge != null && (
              <Box style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 8, minWidth: 16, textAlign: 'center', background: t.dim ? '#bbb' : '#dc2626', color: '#fff' }}>
                {t.badge}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <ScrollArea flex={1} style={{ minHeight: 0 }}>
        {d ? (
          <>
            {tab === 'CHECKS'  && <ChecksPanel d={d} />}
            {tab === 'FIELDS'  && <FieldsPanel d={d} />}
            {tab === 'LINES'   && <LinesPanel d={d} />}
            {tab === 'PAYLOAD' && <PayloadPanel d={d} />}
            {tab === 'AUDIT'   && <AuditPanel d={d} />}
          </>
        ) : (
          <Box px={14} py={12}><Text size="xs" c="#aaa">No detail data available for this item.</Text></Box>
        )}
      </ScrollArea>

      {/* Footer actions */}
      <Box px={12} py={9} style={{ borderTop: '1px solid #ebebeb', background: '#fff', flexShrink: 0 }}>
        <Group gap={5} mb={7}>
          <Button flex={1} style={{ background: '#111', color: '#fff', fontWeight: 700, fontSize: 11.5, borderRadius: 4, border: 'none' }} leftSection={<IconCheck size={12} />}>
            Approve &amp; Send
          </Button>
          <Button flex={1} style={{ background: '#d97706', color: '#fff', fontWeight: 700, fontSize: 11.5, borderRadius: 4, border: 'none' }}>
            Keep Set Aside
          </Button>
          <Button style={{ background: '#f5f5f5', color: '#555', fontWeight: 700, fontSize: 10.5, borderRadius: 4, border: '1px solid #e0e0e0', flexShrink: 0, padding: '8px 10px' }}>
            Mark Manually Processed
          </Button>
        </Group>
        <Group justify="space-between" align="center">
          <Text style={{ fontSize: 11, color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconRefresh size={11} /> Re-run all checks
          </Text>
          <Text style={{ fontSize: 11, color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconX size={11} /> Reject / Not relevant
          </Text>
        </Group>
      </Box>
    </Box>
  )
}