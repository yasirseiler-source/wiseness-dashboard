import styles from './HeroSection.module.css'

export default function HeroSection({ vertical }) {
  return (
    <div className={styles.hero} style={{
      background: `linear-gradient(135deg, ${vertical.gradientFrom} 0%, ${vertical.gradientTo} 100%)`,
    }}>
      {vertical.heroImage && (
        <img src={vertical.heroImage} alt="" className={styles.bgImg} loading="lazy" />
      )}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.sectorLabel}>{vertical.title}</div>
        <h1 className={styles.title}>{vertical.heroTitle}</h1>
        <p className={styles.text}>{vertical.heroText}</p>
      </div>

      <div className={styles.modulesPanel}>
        <div className={styles.modulesPanelLabel}>Enthaltene Module</div>
        {vertical.modules.slice(0, 6).map((m) => (
          <div key={m.name} className={styles.moduleRow}>
            <div className={styles.moduleCheck} />
            <span>{m.name}</span>
          </div>
        ))}
        {vertical.modules.length > 6 && (
          <div className={styles.moduleMore}>+ {vertical.modules.length - 6} weitere</div>
        )}
      </div>

      <div className={styles.gridDecor} />
    </div>
  )
}
