import { useState } from 'react'
import Icon from '../ui/Icon'
import styles from './FinalPage.module.css'

const sizeMap = {
  S:  { label: 'Klein',      desc: 'Bis 10 Räume, bis 20 Mitarbeiter',      color: 'var(--status-green)',  bg: 'var(--status-green-bg)',  pct: 25 },
  M:  { label: 'Mittel',     desc: '10–30 Räume, 20–50 Mitarbeiter',         color: 'var(--primary)',        bg: 'var(--primary-lighter)',  pct: 50 },
  L:  { label: 'Groß',       desc: '30–60 Räume, 50–100 Mitarbeiter',        color: 'var(--status-yellow)', bg: 'var(--status-yellow-bg)', pct: 75 },
  XL: { label: 'Enterprise', desc: 'Über 60 Räume, über 100 Mitarbeiter',    color: 'var(--status-red)',    bg: 'var(--status-red-bg)',    pct: 100 },
}

/* Donut SVG */
function DonutChart({ active, total }) {
  const r = 44, cx = 52, cy = 52, circ = 2 * Math.PI * r
  const pct = total > 0 ? active / total : 0
  return (
    <div className={styles.donutWrap}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)" strokeWidth="10"
          strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="butt"
          transform="rotate(-90 52 52)" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
        <text x="52" y="48" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--primary)" fontFamily="Montserrat,sans-serif">{active}</text>
        <text x="52" y="63" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="Montserrat,sans-serif">von {total}</text>
      </svg>
      <span className={styles.donutLabel}>Module aktiv</span>
    </div>
  )
}

/* Size bar */
function SizeBar({ systemSize }) {
  const sizes = ['S', 'M', 'L', 'XL']
  return (
    <div className={styles.sizeBar}>
      {sizes.map((s) => {
        const info = sizeMap[s]
        const active = s === systemSize
        const past = sizes.indexOf(s) <= sizes.indexOf(systemSize)
        return (
          <div key={s} className={styles.sizeSegment}>
            <div className={styles.sizeSegBar}
              style={{ background: past ? info.color : 'var(--border)', opacity: active ? 1 : past ? 0.5 : 0.3 }} />
            <span className={styles.sizeSegLabel} style={{ color: active ? info.color : 'var(--text-muted)', fontWeight: active ? 800 : 500 }}>{s}</span>
          </div>
        )
      })}
    </div>
  )
}

/* Needs bar chart */
const needsKeys = [
  { key: 'sicherheitsbedarf',    label: 'Sicherheit' },
  { key: 'automatisierungsbedarf', label: 'Automation' },
  { key: 'wartungsbedarf',       label: 'Wartung' },
  { key: 'kommunikationsbedarf', label: 'Kommunikation' },
  { key: 'notfallmanagement',    label: 'Notfall' },
]
const lvls = ['Kein Bedarf', 'Niedrig', 'Mittel', 'Hoch', 'Sehr hoch']
const bClrs = ['var(--border)', 'var(--status-green)', '#E8A020', '#D4640A', 'var(--status-red)']

function NeedsChart({ formData }) {
  const bars = needsKeys.map(({ key, label }) => {
    const idx = lvls.indexOf(formData[key] || '')
    return { label, pct: idx <= 0 ? 0 : (idx / (lvls.length - 1)) * 100, color: bClrs[Math.max(idx, 0)], val: formData[key] || '' }
  }).filter(b => b.pct > 0)

  if (!bars.length) return <p className={styles.noData}>Keine Bedarfsangaben erfasst.</p>
  return (
    <div className={styles.needsChart}>
      {bars.map(b => (
        <div key={b.label} className={styles.needsRow}>
          <span className={styles.needsLabel}>{b.label}</span>
          <div className={styles.needsTrack}><div className={styles.needsFill} style={{ width: `${b.pct}%`, background: b.color }} /></div>
          <span className={styles.needsVal}>{b.val}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Main ── */
export default function FinalPage({ state, vertical, onBack }) {
  const { selectedModules, selectedSensors, systemSize, cameraCount, technicalHints, formData, effectiveSensorQty, totalModules } = state
  const size = sizeMap[systemSize] || sizeMap.S
  const modules = Array.from(selectedModules)
  const sensors = Array.from(selectedSensors)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSend() {
    setSending(true)
    const payload = { vertical: vertical?.id, formData, selectedModules: modules, selectedSensors: sensors, effectiveSensorQty, systemSize, cameraCount, technicalHints }
    try {
      const res = await fetch('/api/intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error()
    } catch { console.log('[Wiseness Intake] Payload:', payload) }
    setSending(false); setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIconWrap}><Icon name="check" size={28} color="var(--status-green)" /></div>
          <h1 className={styles.successTitle}>Anfrage übermittelt</h1>
          <p className={styles.successText}>Ihre Systemkonfiguration wurde erfolgreich gesendet. Das Wiseness-Team meldet sich in Kürze bei Ihnen.</p>
          {formData.firmenname && <div className={styles.successMeta}>{formData.firmenname}{formData.email && ` · ${formData.email}`}</div>}
          <button className={styles.backBtn} onClick={onBack}>Zur Startseite</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backLink} onClick={onBack}>
          <Icon name="chevronRight" size={14} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
          Zurück
        </button>
        <div>
          <h1 className={styles.pageTitle}>Systemempfehlung & Projektzusammenfassung</h1>
          <p className={styles.pageSubtitle}>Automatisch generiert auf Basis Ihrer Eingaben</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* Analysis header */}
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="chart" size={14} color="var(--text-muted)" /><span>Systemanalyse</span></div>
            <div className={styles.analysisRow}>
              <DonutChart active={modules.length} total={totalModules || 10} />
              <div className={styles.analysisMid}>
                <div className={styles.analysisSub}>Systemgröße</div>
                <SizeBar systemSize={systemSize} />
                <div className={styles.sizeReadout}>
                  <span className={styles.sizeCode} style={{ color: size.color }}>{systemSize}</span>
                  <span className={styles.sizeName}>{size.label}</span>
                </div>
                <div className={styles.sizeDesc}>{size.desc}</div>
              </div>
              <div className={styles.cameraBlock}>
                <Icon name="camera" size={18} color="var(--primary)" />
                <div className={styles.cameraNum}>{cameraCount}</div>
                <div className={styles.cameraLabel}>Kameras<br/>empfohlen</div>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="layers" size={14} color="var(--text-muted)" /><span>Empfohlene Module</span><span className={styles.countTag}>{modules.length}</span></div>
            <div className={styles.tagList}>
              {modules.map(m => <span key={m} className={styles.tag}>{m}</span>)}
            </div>
          </div>

          {/* Sensors */}
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="radio" size={14} color="var(--text-muted)" /><span>Empfohlene Sensorik</span><span className={styles.countTag}>{sensors.length}</span></div>
            <div className={styles.sensorTable}>
              <div className={styles.sensorTableHead}><span>Typ</span><span>Menge</span></div>
              {sensors.map(s => (
                <div key={s} className={styles.sensorRow}>
                  <span className={styles.sensorDot} /><span className={styles.sensorName}>{s}</span>
                  {effectiveSensorQty?.[s] !== undefined && <span className={styles.sensorQty}>{effectiveSensorQty[s]}×</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Needs chart */}
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="target" size={14} color="var(--text-muted)" /><span>Bedarfsanalyse</span></div>
            <NeedsChart formData={formData} />
          </div>

          {/* Technical hints */}
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="tool" size={14} color="var(--text-muted)" /><span>Technische Hinweise</span></div>
            <ul className={styles.hintList}>
              {technicalHints.map((h, i) => (
                <li key={i} className={styles.hintItem}><div className={styles.hintNum}>{i + 1}</div>{h}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="file" size={14} color="var(--text-muted)" /><span>Projektzusammenfassung</span></div>
            <table className={styles.sumTable}>
              <tbody>
                {[
                  ['Firma', formData.firmenname],
                  ['Ansprechpartner', formData.ansprechpartner],
                  ['Standort', formData.standort],
                  ['Branche', formData.branche],
                  ['Objekttyp', formData.objekttyp],
                  ['Fläche', formData.gesamtflaeche && `${formData.gesamtflaeche} m²`],
                  ['Räume', formData.anzahlRaeume],
                  ['Etagen', formData.anzahlEtagen],
                  ['Mitarbeiter', formData.anzahlMitarbeiter],
                  ['Bewohner/Nutzer', formData.anzahlBewohner],
                  ['Budget', formData.budgetrahmen],
                  ['Priorität', formData.prioritaet],
                  ['Zeitraum', formData.umsetzungszeitraum],
                  ['Branchentyp', vertical?.title],
                  ['Systemgröße', `${systemSize} – ${size.label}`, true],
                  ['Kameras empfohlen', `${cameraCount} Stück`, true],
                  ['Module aktiv', `${modules.length} von ${totalModules || 10}`, true],
                ].filter(([, v]) => !!v).map(([label, value, hl]) => (
                  <tr key={label} className={hl ? styles.sumRowHl : styles.sumRow}>
                    <td className={styles.sumLabel}>{label}</td>
                    <td className={styles.sumValue}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {formData.freitextWuensche && (
            <div className={styles.card}>
              <div className={styles.cardHead}><Icon name="messageSquare" size={14} color="var(--text-muted)" /><span>Individuelle Wünsche</span></div>
              <p className={styles.freitext}>{formData.freitextWuensche}</p>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="send" size={14} color="var(--text-muted)" /><span>Anfrage absenden</span></div>
            <p className={styles.sendText}>Die vollständige Konfiguration wird als strukturierter Datensatz an das Wiseness-Team übermittelt.</p>
            <button className={styles.sendBtn} onClick={handleSend} disabled={sending}>
              {sending ? 'Wird gesendet…' : 'System berechnen & Anfrage senden'}
              {!sending && <Icon name="arrowRight" size={14} color="#fff" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
