/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * SetDeckPDF — Branded production reference document for a studio set.
 *
 * Rendered entirely client-side via @react-pdf/renderer.
 * This file is ONLY imported dynamically (via DownloadSetDeckButton) so it
 * never appears in the initial JS bundle.
 *
 * Design:  Dark background · gold accent · clean two-column spec grid
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { SanityStudio } from '@/lib/sanity';
import { fmtSize, fmtHeight, fmtRate, fmtRateUnit } from '@/lib/studio-utils';

// ── Register built-in Helvetica (no font download needed) ─────────────────────
Font.register({ family: 'Helvetica', src: 'Helvetica' });

// ── Design tokens ─────────────────────────────────────────────────────────────
const DARK = '#0d0d0d';
const DARK2 = '#141414';
const DARK3 = '#1a1a1a';
const GOLD = '#d4af37';
const GOLD_L = '#e8cc6a';
const WHITE = '#f5f5f0';
const GRAY = '#888880';
const GRAY_L = '#b8b8b0';

// ── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: DARK,
    fontFamily: 'Helvetica',
    padding: 0,
  },

  // ── Header band ─────────────────────────────────────────────────────────────
  header: {
    backgroundColor: DARK2,
    padding: '36 40 28 40',
    borderBottom: `3 solid ${GOLD}`,
  },
  studioLabel: {
    fontSize: 7,
    letterSpacing: 3,
    color: GOLD,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  setName: {
    fontSize: 30,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 10,
    color: GRAY_L,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
    maxWidth: 400,
  },

  // ── Stats row ───────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    gap: 0,
    backgroundColor: DARK3,
    borderBottom: `1 solid #2a2a2a`,
  },
  statCell: {
    flex: 1,
    padding: '14 20',
    borderRight: `1 solid #2a2a2a`,
  },
  statLabel: {
    fontSize: 6,
    letterSpacing: 2,
    color: GOLD,
    textTransform: 'uppercase',
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  statValue: {
    fontSize: 13,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
  },

  // ── Body ────────────────────────────────────────────────────────────────────
  body: {
    padding: '28 40',
    gap: 24,
  },

  // ── Section heading ──────────────────────────────────────────────────────────
  sectionHeading: {
    fontSize: 7,
    letterSpacing: 2.5,
    color: GOLD,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
    borderBottom: `1 solid #2a2a2a`,
    paddingBottom: 5,
  },

  // ── Description block ────────────────────────────────────────────────────────
  description: {
    fontSize: 9.5,
    color: GRAY_L,
    lineHeight: 1.75,
    fontFamily: 'Helvetica',
  },

  // ── Two-column grid ──────────────────────────────────────────────────────────
  twoCol: {
    flexDirection: 'row',
    gap: 20,
  },
  col: {
    flex: 1,
  },

  // ── List items ────────────────────────────────────────────────────────────────
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(212,175,55,0.12)',
    border: `1 solid rgba(212,175,55,0.3)`,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  bulletTick: {
    fontSize: 7,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1,
  },
  listText: {
    fontSize: 9,
    color: GRAY_L,
    fontFamily: 'Helvetica',
    flex: 1,
    lineHeight: 1.5,
  },

  // ── Numbered list items ───────────────────────────────────────────────────────
  numberedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
    padding: '6 10',
    backgroundColor: DARK3,
    borderRadius: 4,
  },
  numberedIndex: {
    fontSize: 8,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    opacity: 0.5,
    minWidth: 16,
  },
  numberedText: {
    fontSize: 9,
    color: WHITE,
    fontFamily: 'Helvetica',
    flex: 1,
  },

  // ── Divider ────────────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 4,
  },

  // ── Contact / booking footer ──────────────────────────────────────────────────
  footer: {
    marginTop: 'auto',
    backgroundColor: DARK2,
    borderTop: `1 solid #2a2a2a`,
    padding: '20 40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flex: 1,
  },
  footerBrand: {
    fontSize: 10,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  footerTagline: {
    fontSize: 7.5,
    color: GRAY,
    fontFamily: 'Helvetica',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerContact: {
    fontSize: 7.5,
    color: GRAY_L,
    fontFamily: 'Helvetica',
    textAlign: 'right',
    marginBottom: 2,
  },
  footerCTA: {
    fontSize: 7,
    color: GOLD,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'right',
    marginTop: 4,
  },

  // ── Gold accent bar ───────────────────────────────────────────────────────────
  goldBar: {
    height: 3,
    backgroundColor: GOLD,
    marginBottom: 0,
  },

  // ── Rate badge ────────────────────────────────────────────────────────────────
  rateBadge: {
    backgroundColor: 'rgba(212,175,55,0.1)',
    border: `1 solid rgba(212,175,55,0.3)`,
    borderRadius: 100,
    padding: '5 14',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  rateBadgeText: {
    fontSize: 9,
    color: GOLD_L,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
});

// ── Helper: single facility / feature list item ───────────────────────────────
function BulletItem({ text }: { text: string }) {
  return (
    <View style={s.listItem}>
      <View style={s.bullet}>
        <Text style={s.bulletTick}>✓</Text>
      </View>
      <Text style={s.listText}>{text}</Text>
    </View>
  );
}

// ── Helper: numbered "Suitable For" item ──────────────────────────────────────
function NumberedItem({ index, text }: { index: number; text: string }) {
  return (
    <View style={s.numberedItem}>
      <Text style={s.numberedIndex}>{String(index + 1).padStart(2, '0')}</Text>
      <Text style={s.numberedText}>{text}</Text>
    </View>
  );
}

// ── PDF Document ─────────────────────────────────────────────────────────────
interface Props {
  studio: SanityStudio;
  businessName: string;
  contactPhone: string;
  contactEmail: string;
}

export function SetDeckDocument({ studio, businessName, contactPhone, contactEmail }: Props) {
  const rateFrom = fmtRate(studio.rateHourly, studio.ratePerDay);
  const rateUnit = fmtRateUnit(studio.rateUnit, studio.rateHourly);

  return (
    <Document
      title={`${studio.title} — Set Deck | Cine Classic Studios`}
      author="Cine Classic Studios"
      subject="Production Reference Document"
      keywords={`film studio, ${studio.title}, Mumbai, set deck, production`}
      creator="Cine Classic Studios"
    >
      <Page size="A4" style={s.page}>

        {/* ── Gold top bar ── */}
        <View style={s.goldBar} />

        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.studioLabel}>Cine Classic Studios  ·  Set Reference Deck</Text>
          <Text style={s.setName}>{studio.title}</Text>
          <Text style={s.tagline}>{studio.tagline ?? ''}</Text>
          {/* Rate */}
          <View style={s.rateBadge}>
            <Text style={s.rateBadgeText}>From {rateFrom}{rateUnit}</Text>
          </View>
        </View>

        {/* ── Quick-stats strip ── */}
        <View style={s.statsRow}>
          {[
            { label: 'Floor Area', value: fmtSize(studio.size) },
            { label: 'Ceiling Height', value: fmtHeight(studio.height) },
            { label: 'Max Capacity', value: studio.capacity ?? '—' },
          ].map((stat) => (
            <View key={stat.label} style={s.statCell}>
              <Text style={s.statLabel}>{stat.label}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Body ── */}
        <View style={s.body}>

          {/* About this set */}
          <View>
            <Text style={s.sectionHeading}>About This Set</Text>
            <Text style={s.description}>{studio.description ?? ''}</Text>
          </View>

          <View style={s.divider} />

          {/* Two-column: Facilities + Suitable For */}
          <View style={s.twoCol}>

            {/* Facilities */}
            <View style={s.col}>
              <Text style={s.sectionHeading}>Facilities Included</Text>
              {studio.facilities.map((f) => (
                <BulletItem key={f} text={f} />
              ))}
            </View>

            {/* Suitable For */}
            <View style={s.col}>
              <Text style={s.sectionHeading}>Suitable For</Text>
              {studio.suitableFor.map((u, i) => (
                <NumberedItem key={u} index={i} text={u} />
              ))}
            </View>

          </View>

        </View>

        {/* ── Footer ── */}
        <View style={s.footer}>
          <View style={s.footerLeft}>
            <Text style={s.footerBrand}>{businessName}</Text>
            <Text style={s.footerTagline}>
              Mumbai&apos;s Premier Film Studio Complex  ·  Near Film City, Goregaon East
            </Text>
          </View>
          <View style={s.footerRight}>
            <Text style={s.footerContact}>{contactPhone}</Text>
            <Text style={s.footerContact}>{contactEmail}</Text>
            <Text style={s.footerCTA}>Book This Set →</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
