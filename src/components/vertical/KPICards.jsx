import Icon from '../ui/Icon'
import styles from './KPICards.module.css'

export default function KPICards({ kpiDefs, kpis, onUpdate }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <Icon name="chart" size={14} color="var(--text-muted)" />
        <span>KPI-Eingabe</span>
      </div>
      <div className={styles.grid}>
        {kpiDefs.map((kpi) => (
          <div key={kpi.key} className={styles.card}>
            <label className={styles.label}>{kpi.label}</label>
            <input
              type="number"
              min="0"
              className={styles.input}
              value={kpis[kpi.key] || ''}
              onChange={(e) => onUpdate(kpi.key, e.target.value)}
              placeholder="—"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
