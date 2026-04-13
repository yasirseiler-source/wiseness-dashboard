import styles from './NeedsSection.module.css'

const needsItems = [
  { key: 'sicherheitsbedarf',    label: 'Sicherheitsbedarf' },
  { key: 'automatisierungsbedarf', label: 'Automatisierungsbedarf' },
  { key: 'aufgabenmanagement',   label: 'Aufgabenmanagement' },
  { key: 'wartungsbedarf',       label: 'Wartungsbedarf' },
  { key: 'kommunikationsbedarf', label: 'Kommunikationsbedarf' },
  { key: 'energieueberwachung',  label: 'Energieüberwachung' },
  { key: 'notfallmanagement',    label: 'Notfallmanagement' },
]

const levelOptions = ['Kein Bedarf', 'Niedrig', 'Mittel', 'Hoch', 'Sehr hoch']

const levelMeta = {
  'Kein Bedarf': { bar: 'var(--border)',          label: 'var(--text-muted)' },
  'Niedrig':     { bar: 'var(--status-green)',     label: 'var(--status-green)' },
  'Mittel':      { bar: '#E8A020',                 label: 'var(--status-yellow)' },
  'Hoch':        { bar: '#D4640A',                 label: 'var(--status-orange)' },
  'Sehr hoch':   { bar: 'var(--status-red)',       label: 'var(--status-red)' },
}

function levelToPercent(val) {
  const idx = levelOptions.indexOf(val)
  return idx <= 0 ? 0 : (idx / (levelOptions.length - 1)) * 100
}

export default function NeedsSection({ formData, onUpdate }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Bedarfsfeld</span>
          <span>Priorität</span>
          <span>Indikator</span>
        </div>
        {needsItems.map((item) => {
          const val = formData[item.key] || ''
          const pct = levelToPercent(val)
          const meta = levelMeta[val] || levelMeta['Kein Bedarf']
          return (
            <div key={item.key} className={styles.row}>
              <span className={styles.rowLabel}>{item.label}</span>
              <select
                className={`form-select ${styles.rowSelect}`}
                value={val}
                onChange={(e) => onUpdate(item.key, e.target.value)}
              >
                <option value="">— auswählen</option>
                {levelOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <div className={styles.barWrap}>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%`, background: meta.bar }} />
                </div>
                {val && <span className={styles.barLabel} style={{ color: meta.label }}>{val}</span>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="form-group" style={{ marginTop: '14px' }}>
        <label className="form-label">Individuelle Wünsche / Freitext</label>
        <textarea
          className="form-textarea"
          placeholder="Spezifische Anforderungen oder Hinweise..."
          value={formData.freitextWuensche || ''}
          onChange={(e) => onUpdate('freitextWuensche', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  )
}
