import Icon from '../ui/Icon'
import styles from './SensorSelector.module.css'

export default function SensorSelector({ sensors, selected, onToggle, sensorMode, onModeChange, sensorQuantities, onQtyChange, effectiveSensorQty }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="radio" size={14} color="var(--text-muted)" />
          <span>Empfohlene Sensorik</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.count}>{selected.size} / {sensors.length} aktiv</span>
          <div className={styles.toggle}>
            <button className={`${styles.toggleBtn} ${sensorMode === 'auto' ? styles.toggleOn : ''}`} onClick={() => onModeChange('auto')}>Automatisch</button>
            <button className={`${styles.toggleBtn} ${sensorMode === 'manual' ? styles.toggleOn : ''}`} onClick={() => onModeChange('manual')}>Manuell</button>
          </div>
        </div>
      </div>

      <div className={styles.modeHint}>
        <Icon name="info" size={12} color="var(--text-muted)" />
        {sensorMode === 'auto'
          ? 'Mengen werden automatisch anhand der Raumanzahl berechnet.'
          : 'Geben Sie die gewünschte Stückzahl je Sensortyp manuell ein.'}
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Sensortyp</span>
          <span>Einheit</span>
          <span className={styles.colQty}>Anzahl</span>
        </div>
        {sensors.map((sensor) => {
          const isActive = selected.has(sensor.name)
          const qty = effectiveSensorQty[sensor.name] || 0
          return (
            <div key={sensor.name} className={`${styles.row} ${isActive ? styles.rowActive : ''}`}>
              <div className={styles.rowLeft}>
                <button className={styles.checkBtn} onClick={() => onToggle(sensor.name)}>
                  <div className={`${styles.checkBox} ${isActive ? styles.checkOn : ''}`}>
                    {isActive && <Icon name="check" size={9} color="#fff" />}
                  </div>
                </button>
                <span className={styles.sensorName}>{sensor.name}</span>
              </div>
              <span className={styles.sensorUnit}>{sensor.unit}</span>
              <div className={styles.colQty}>
                {isActive && (
                  sensorMode === 'manual' ? (
                    <input
                      type="number"
                      min="0"
                      className={styles.qtyInput}
                      value={sensorQuantities[sensor.name] ?? ''}
                      onChange={(e) => onQtyChange(sensor.name, e.target.value)}
                      placeholder="—"
                    />
                  ) : (
                    <span className={styles.autoQty}>{qty}</span>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
