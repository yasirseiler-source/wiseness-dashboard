import Icon from '../ui/Icon'
import styles from './LandingPage.module.css'

const cards = [
  {
    id: 'pflege',
    icon: 'activity',
    label: 'SEKTOR 01',
    title: 'Pflege / Klinik / Huzurevi',
    subtitle: 'Pflegeheime, Kliniken & betreute Einrichtungen',
    description: 'Intelligente Pflege- und Sicherheitsstruktur. Bewohnerverwaltung, Notfalllogik, Pflegeprozesse und Personalsteuerung.',
    tags: ['Bewohnerverwaltung', 'Notrufsystem', 'Sturzrisiko', 'Medikamentenlogik'],
    accentColor: '#1B5FA6',
  },
  {
    id: 'fabrik',
    icon: 'cpu',
    label: 'SEKTOR 02',
    title: 'Fabrik / Produktion / Lager',
    subtitle: 'Fabriken, Produktionen & technische Betriebe',
    description: 'Transparenz für Maschinen, Prozesse und Materialfluss. Wartungsmanagement, Störungslogik und Schichtplanung.',
    tags: ['Maschinenübersicht', 'Wartungsmanagement', 'Störungslogik', 'Lagerstruktur'],
    accentColor: '#1B5FA6',
  },
  {
    id: 'unternehmen',
    icon: 'briefcase',
    label: 'SEKTOR 03',
    title: 'Unternehmen / Büro / Service',
    subtitle: 'Büros, Dienstleister & Verwaltungen',
    description: 'Struktur, Kommunikation und Aufgaben in einem System. Rollen, Prozesse und operative Klarheit.',
    tags: ['Aufgabenmanagement', 'Abteilungsstruktur', 'Raumbelegung', 'Management-Dashboard'],
    accentColor: '#1B5FA6',
  },
]

export default function LandingPage({ onNavigate }) {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>WISENESS SYSTEM — INTAKE DASHBOARD</div>
          <h1 className={styles.heroTitle}>Professional System<br />Intake & Configuration</h1>
          <p className={styles.heroText}>
            Strukturierte Bedarfserfassung, automatische Systemempfehlung und
            individuelle Angebotsplanung für Enterprise-Kunden.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>3</span><span className={styles.statLabel}>Branchen</span></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><span className={styles.statNum}>30+</span><span className={styles.statLabel}>Module</span></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><span className={styles.statNum}>S–XL</span><span className={styles.statLabel}>Systemgrößen</span></div>
          </div>
        </div>
        <div className={styles.heroGrid} />
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <span>Branche auswählen</span>
      </div>

      {/* Cards */}
      <div className={styles.cards}>
        {cards.map((card, i) => (
          <button
            key={card.id}
            className={styles.card}
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => onNavigate('vertical', card.id)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIconBox}>
                <Icon name={card.icon} size={18} color="var(--primary)" />
              </div>
              <span className={styles.cardLabel}>{card.label}</span>
            </div>

            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardSub}>{card.subtitle}</p>
            <p className={styles.cardDesc}>{card.description}</p>

            <div className={styles.cardTags}>
              {card.tags.map((t) => (
                <span key={t} className={styles.cardTag}>{t}</span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.cardCta}>Intake starten</span>
              <Icon name="arrowRight" size={14} color="var(--primary)" />
            </div>
          </button>
        ))}
      </div>

      {/* Feature bar */}
      <div className={styles.featureBar}>
        {[
          { icon: 'list', text: 'Strukturierte Bedarfserfassung' },
          { icon: 'settings', text: 'Automatische Systemempfehlung' },
          { icon: 'send', text: 'Direkte Angebotsanfrage' },
        ].map(({ icon, text }) => (
          <div key={text} className={styles.feature}>
            <Icon name={icon} size={14} color="var(--text-muted)" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
