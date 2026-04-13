import styles from './Navbar.module.css'

export default function Navbar({ currentPage, activeVertical, onNavigate }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand} onClick={() => onNavigate('landing')}>
        <img src="/wiseness-logo.jpg" alt="Wiseness" className={styles.logo} />
        <div className={styles.brandText}>
          <span className={styles.brandName}>Wiseness</span>
          <span className={styles.brandSep} />
          <span className={styles.brandSub}>Professional Intake Dashboard</span>
        </div>
      </div>

      <div className={styles.nav}>
        {[
          { id: 'landing',     label: 'Übersicht' },
          { id: 'pflege',      label: 'Pflege / Klinik' },
          { id: 'fabrik',      label: 'Fabrik / Produktion' },
          { id: 'unternehmen', label: 'Unternehmen / Büro' },
        ].map(({ id, label }) => {
          const isActive =
            id === 'landing'
              ? currentPage === 'landing'
              : currentPage === 'vertical' && activeVertical?.id === id
          return (
            <button
              key={id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => id === 'landing' ? onNavigate('landing') : onNavigate('vertical', id)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className={styles.status}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>Beratungsmodus aktiv</span>
      </div>
    </nav>
  )
}
