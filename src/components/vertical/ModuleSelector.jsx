import Icon from '../ui/Icon'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ modules, selected, onToggle }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="layers" size={14} color="var(--text-muted)" />
          <span>Systemmodule</span>
        </div>
        <span className={styles.count}>{selected.size} / {modules.length} aktiv</span>
      </div>
      <div className={styles.grid}>
        {modules.map((mod) => {
          const isActive = selected.has(mod.name)
          return (
            <button
              key={mod.name}
              className={`${styles.card} ${isActive ? styles.active : ''}`}
              onClick={() => onToggle(mod.name)}
            >
              <div className={styles.cardTop}>
                <div className={styles.checkBox}>
                  {isActive && <Icon name="check" size={10} color="#fff" />}
                </div>
                <span className={`${styles.statusTag} ${isActive ? styles.statusActive : styles.statusInactive}`}>
                  {isActive ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
              <div className={styles.cardName}>{mod.name}</div>
              <div className={styles.cardDesc}>{mod.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
