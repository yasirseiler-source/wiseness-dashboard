import Icon from '../ui/Icon'
import styles from './LandingPage.module.css'

const cards = [
  {
    id: 'pflege',
    icon: 'activity',
    label: 'SEKTÖR 01',
    title: 'Bakım / Klinik / Huzurevi',
    subtitle: 'Bakım evleri, klinikler ve destekli yaşam alanları',
    description: 'Akıllı bakım ve güvenlik yapısı. Sakin yönetimi, acil durum mantığı, bakım süreçleri ve personel yönetimi.',
    tags: ['Sakin yönetimi', 'Acil çağrı sistemi', 'Düşme riski', 'İlaç yönetimi'],
    accentColor: '#1B5FA6',
  },
  {
    id: 'fabrik',
    icon: 'cpu',
    label: 'SEKTÖR 02',
    title: 'Fabrika / Üretim / Depo',
    subtitle: 'Fabrikalar, üretim tesisleri ve teknik işletmeler',
    description: 'Makine, süreç ve malzeme akışı için şeffaflık. Bakım yönetimi, arıza mantığı ve vardiya planlaması.',
    tags: ['Makine görünümü', 'Bakım yönetimi', 'Arıza mantığı', 'Depo yapısı'],
    accentColor: '#1B5FA6',
  },
  {
    id: 'unternehmen',
    icon: 'briefcase',
    label: 'SEKTÖR 03',
    title: 'İşletme / Ofis / Hizmet',
    subtitle: 'Ofisler, hizmet firmaları ve yönetim birimleri',
    description: 'Yapı, iletişim ve görevler tek bir sistemde. Roller, süreçler ve operasyonel netlik.',
    tags: ['Görev yönetimi', 'Departman yapısı', 'Alan kullanımı', 'Yönetim paneli'],
    accentColor: '#1B5FA6',
  },
]

export default function LandingPage({ onNavigate }) {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>WISENESS SYSTEM — BAŞVURU PANELİ</div>
          <h1 className={styles.heroTitle}>
            Profesyonel Sistem<br />Başvuru ve Yapılandırma
          </h1>
          <p className={styles.heroText}>
            Yapılandırılmış ihtiyaç analizi, otomatik sistem önerisi ve
            kurumsal müşteriler için özel teklif planlaması.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Sektör</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>30+</span>
              <span className={styles.statLabel}>Modül</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>S–XL</span>
              <span className={styles.statLabel}>Sistem boyutları</span>
            </div>
          </div>
        </div>
        <div className={styles.heroGrid} />
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <span>Sektör seçin</span>
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
              <span className={styles.cardCta}>Başvuruyu başlat</span>
              <Icon name="arrowRight" size={14} color="var(--primary)" />
            </div>
          </button>
        ))}
      </div>

      {/* Feature bar */}
      <div className={styles.featureBar}>
        {[
          { icon: 'list', text: 'Yapılandırılmış ihtiyaç analizi' },
          { icon: 'settings', text: 'Otomatik sistem önerisi' },
          { icon: 'send', text: 'Doğrudan teklif talebi' },
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
