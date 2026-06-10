import {
  Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 44,
    color: '#222',
    backgroundColor: '#fff',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#003087',
    marginBottom: 14,
  },
  logoText: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#003087',
    letterSpacing: -0.3,
  },
  logoCorp: {
    fontSize: 7.5,
    color: '#777',
    marginTop: 1,
  },
  logoAddr: {
    fontSize: 8,
    color: '#555',
    marginTop: 5,
    lineHeight: 1.5,
  },
  poTitle: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: '#003087',
    textAlign: 'right',
  },
  poMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  poMetaLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: '#333',
  },
  poMetaValue: {
    fontSize: 8,
    color: '#333',
    marginLeft: 3,
  },

  // Sections
  twoCol: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  addrBox: {
    flex: 1,
  },
  addrLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#777',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  addrInner: {
    border: '1pt solid #ddd',
    borderRadius: 2,
    padding: '5 7',
    fontSize: 8,
    color: '#222',
    lineHeight: 1.5,
  },
  addrBlue: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
  },
  addrYellow: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },

  // Terms bar
  termsBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: '6 8',
    borderRadius: 2,
    marginBottom: 12,
    gap: 0,
  },
  termItem: {
    flex: 1,
  },
  termLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#777',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  termValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
  },
  termValueOrange: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#c06010',
  },

  // Table
  table: {
    marginBottom: 12,
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#003087',
  },
  tableHeadCell: {
    color: '#fff',
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    padding: '4 6',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableRowAlt: {
    backgroundColor: '#f8f8f8',
  },
  tableCell: {
    fontSize: 8,
    color: '#333',
    padding: '4 6',
  },
  tableTotalRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tableTotalLabel: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#003087',
    textAlign: 'right',
    padding: '3 6',
  },
  tableTotalValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#003087',
    padding: '3 6',
    width: 60,
  },

  // Notes section
  notesSection: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  notesTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 8,
    color: '#666',
    lineHeight: 1.5,
  },

  // Signatures
  sigRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  sigBox: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    paddingTop: 4,
  },
  sigLabel: {
    fontSize: 7.5,
    color: '#888',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 44,
    right: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 5,
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
})

// Column widths for line table
const colWidths = [28, 72, 120, 24, 24, 48, 52]
const headers = ['Line', 'Part Number', 'Description', 'Qty', 'UOM', 'Unit Price', 'Total']
const rows = [
  ['1', 'M22520/7-01', 'Crimp Tool, DMC Type M22520', '5', 'EA', '$1,240.00', '$6,200.00'],
  ['2', 'M22520/7-02', 'Positioner, Size 20', '10', 'EA', '$185.50', '$1,855.00'],
  ['3', 'DMC-TH163', 'Turret Head Assy, 163 Series', '2', 'EA', '$3,400.00', '$6,800.00'],
]

export default function PdfDocument() {
  return (
    <Document title="PO_4500987312" author="Lockheed Martin Corporation">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>LOCKHEED MARTIN</Text>
            <Text style={styles.logoCorp}>CORPORATION</Text>
            <Text style={styles.logoAddr}>
              Lockheed Martin — Orlando Aerospace Center{'\n'}
              5600 Sand Lake Road, Orlando FL 32819 USA
            </Text>
          </View>
          <View>
            <Text style={styles.poTitle}>PURCHASE ORDER</Text>
            <View style={{ marginTop: 4 }}>
              {[
                ['PO No.', '4500987312'],
                ['Revision:', 'A'],
                ['Date:', '19-May-2026'],
                ['Page:', '1 of 3'],
              ].map(([l, v]) => (
                <View key={l} style={styles.poMetaRow}>
                  <Text style={styles.poMetaLabel}>{l}</Text>
                  <Text style={styles.poMetaValue}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Supplier / Buyer */}
        <View style={styles.twoCol}>
          <View style={styles.addrBox}>
            <Text style={styles.addrLabel}>Supplier</Text>
            <View style={styles.addrInner}>
              <Text>DANIELS MANUFACTURING CORPORATION{'\n'}526 Thorpe Road{'\n'}Orlando, FL 32824 USA{'\n'}Supplier #: V-44218</Text>
            </View>
          </View>
          <View style={styles.addrBox}>
            <Text style={styles.addrLabel}>Buyer</Text>
            <View style={[styles.addrInner, styles.addrBlue]}>
              <Text>Lockheed Martin Corporation{'\n'}Karen Harris, Buyer III{'\n'}k.harris@lmco.com / +1 407 555 0114</Text>
            </View>
          </View>
        </View>

        {/* Ship To / Bill To */}
        <View style={styles.twoCol}>
          <View style={styles.addrBox}>
            <Text style={styles.addrLabel}>Ship To</Text>
            <View style={[styles.addrInner, styles.addrBlue]}>
              <Text>Lockheed Martin{'\n'}Orlando Aerospace Center{'\n'}5600 Sand Lake Road{'\n'}Orlando, FL 32819 USA{'\n'}Attn: Dock 7 — Receiving</Text>
            </View>
          </View>
          <View style={styles.addrBox}>
            <Text style={styles.addrLabel}>Bill To</Text>
            <View style={[styles.addrInner, styles.addrYellow]}>
              <Text>Lockheed Martin Corp.{'\n'}Accounts Payable — Orlando{'\n'}PO Box 8047{'\n'}Orlando, FL 32862 USA</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsBar}>
          {[
            ['Payment Terms', 'Net 60', false],
            ['Incoterms', 'FOB Origin', false],
            ['Need-by Date', '18-Jul-2026', true],
            ['Currency', 'USD', false],
          ].map(([l, v, orange]) => (
            <View key={l} style={styles.termItem}>
              <Text style={styles.termLabel}>{l}</Text>
              <Text style={orange ? styles.termValueOrange : styles.termValue}>{v}</Text>
            </View>
          ))}
        </View>

        {/* Line items table */}
        <View style={styles.table}>
          <View style={styles.tableHead}>
            {headers.map((h, i) => (
              <Text key={h} style={[styles.tableHeadCell, { width: colWidths[i] }]}>{h}</Text>
            ))}
          </View>
          {rows.map((row, ri) => (
            <View key={ri} style={[styles.tableRow, ri % 2 === 1 ? styles.tableRowAlt : {}]}>
              {row.map((cell, ci) => (
                <Text key={ci} style={[styles.tableCell, { width: colWidths[ci] }]}>{cell}</Text>
              ))}
            </View>
          ))}
          <View style={styles.tableTotalRow}>
            <Text style={styles.tableTotalLabel}>TOTAL ORDER VALUE:</Text>
            <Text style={styles.tableTotalValue}>$14,855.00</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Terms & Conditions</Text>
          <Text style={styles.notesText}>
            This Purchase Order is subject to the Lockheed Martin Standard Procurement Terms and Conditions
            (Rev 12, enclosed). All deliveries must comply with AS9100 Rev D quality requirements. 
            Seller shall provide a Certificate of Conformance and material certifications with each shipment.
            Late delivery penalties apply per Clause 14.3. By accepting this order, Supplier agrees to all
            terms herein including Export Control compliance (EAR/ITAR).
          </Text>
        </View>

        {/* Signatures */}
        <View style={styles.sigRow}>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Authorized Buyer Signature</Text>
          </View>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Supplier Acknowledgement</Text>
          </View>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Date</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PO 4500987312 Rev A — CONFIDENTIAL</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          } />
          <Text style={styles.footerText}>Lockheed Martin Corporation</Text>
        </View>

      </Page>

      {/* Page 2 — Line detail continuation */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>LOCKHEED MARTIN</Text>
            <Text style={styles.logoCorp}>CORPORATION</Text>
          </View>
          <View>
            <Text style={styles.poTitle}>PURCHASE ORDER</Text>
            <View style={styles.poMetaRow}>
              <Text style={styles.poMetaLabel}>PO No.</Text>
              <Text style={styles.poMetaValue}>4500987312 — Continuation</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.notesTitle, { marginBottom: 8 }]}>Line Item Specifications</Text>

        {[
          {
            line: 1, pn: 'M22520/7-01', desc: 'Crimp Tool, DMC Type M22520',
            spec: 'Per MIL-DTL-22520. Tool must be calibrated within 12 months of delivery. Traceable calibration certificate required. CAGE Code 3E4S5.',
            qty: '5 EA', delivery: '18-Jul-2026', price: '$1,240.00 / EA',
          },
          {
            line: 2, pn: 'M22520/7-02', desc: 'Positioner, Size 20',
            spec: 'Compatible with M22520/7-01. Must be individually bagged and labeled. ESD-safe packaging required.',
            qty: '10 EA', delivery: '18-Jul-2026', price: '$185.50 / EA',
          },
          {
            line: 3, pn: 'DMC-TH163', desc: 'Turret Head Assembly, 163 Series',
            spec: 'Factory inspection required. Dimensional report per AS9102 FAI required on first article. Lead time confirmed at time of order.',
            qty: '2 EA', delivery: '18-Jul-2026', price: '$3,400.00 / EA',
          },
        ].map((item, i) => (
          <View key={i} style={{ marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 2, padding: '8 10' }}>
            <View style={{ flexDirection: 'row', marginBottom: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#003087', marginRight: 8 }}>Line {item.line}</Text>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#111' }}>{item.pn}</Text>
              <Text style={{ fontSize: 8, color: '#555', marginLeft: 6 }}>— {item.desc}</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: '#555', lineHeight: 1.5, marginBottom: 4 }}>{item.spec}</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Text style={{ fontSize: 7.5, color: '#333' }}>Qty: <Text style={{ fontFamily: 'Helvetica-Bold' }}>{item.qty}</Text></Text>
              <Text style={{ fontSize: 7.5, color: '#333' }}>Need-by: <Text style={{ fontFamily: 'Helvetica-Bold', color: '#c06010' }}>{item.delivery}</Text></Text>
              <Text style={{ fontSize: 7.5, color: '#333' }}>Unit Price: <Text style={{ fontFamily: 'Helvetica-Bold' }}>{item.price}</Text></Text>
            </View>
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PO 4500987312 Rev A — CONFIDENTIAL</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          } />
          <Text style={styles.footerText}>Lockheed Martin Corporation</Text>
        </View>
      </Page>

      {/* Page 3 — T&Cs summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>LOCKHEED MARTIN</Text>
            <Text style={styles.logoCorp}>CORPORATION</Text>
          </View>
          <View>
            <Text style={styles.poTitle}>PURCHASE ORDER</Text>
            <View style={styles.poMetaRow}>
              <Text style={styles.poMetaLabel}>PO No.</Text>
              <Text style={styles.poMetaValue}>4500987312 — Terms Summary</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.notesTitle, { marginBottom: 8 }]}>Standard Terms & Conditions Summary (Rev 12)</Text>

        {[
          ['1. Acceptance', 'Seller accepts this order by performance or written acknowledgement within 5 business days.'],
          ['2. Price', 'Prices are firm and not subject to escalation unless expressly agreed in writing.'],
          ['3. Delivery', 'Time is of the essence. Seller must notify Buyer within 24 hours if delivery is at risk.'],
          ['4. Quality', 'All items must conform to applicable drawings, specs, and AS9100D requirements.'],
          ['5. Inspection', "Buyer reserves the right to inspect goods at Seller's facility with 48 hours notice."],
          ['6. Warranty', '24-month warranty from date of acceptance. Seller bears cost of returns and re-delivery.'],
          ['7. Export Control', 'Items may be subject to EAR/ITAR. Seller must comply with all applicable regulations.'],
          ['8. Confidentiality', 'All technical data disclosed under this PO is Lockheed Martin proprietary.'],
          ['9. Termination', 'Buyer may terminate for convenience with 30 days written notice.'],
          ['10. Governing Law', 'This agreement shall be governed by the laws of the State of Florida.'],
        ].map(([title, body]) => (
          <View key={title} style={{ marginBottom: 7 }}>
            <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#333', marginBottom: 2 }}>{title}</Text>
            <Text style={{ fontSize: 7.5, color: '#555', lineHeight: 1.5 }}>{body}</Text>
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>PO 4500987312 Rev A — CONFIDENTIAL</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          } />
          <Text style={styles.footerText}>Lockheed Martin Corporation</Text>
        </View>
      </Page>
    </Document>
  )
}