import { useState } from 'react'
import Icon from '../ui/Icon'
import styles from './FinalPage.module.css'

const sizeMap = {
  S:  { label: 'Küçük',      desc: '10 odaya kadar, 20 çalışana kadar',      color: 'var(--status-green)',  bg: 'var(--status-green-bg)',  pct: 25 },
  M:  { label: 'Orta',       desc: '10–30 oda, 20–50 çalışan',               color: 'var(--primary)',        bg: 'var(--primary-lighter)',  pct: 50 },
  L:  { label: 'Büyük',      desc: '30–60 oda, 50–100 çalışan',              color: 'var(--status-yellow)', bg: 'var(--status-yellow-bg)', pct: 75 },
  XL: { label: 'Kurumsal',   desc: '60 odadan fazla, 100 çalışandan fazla',  color: 'var(--status-red)',    bg: 'var(--status-red-bg)',    pct: 100 },
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
        <text x="52" y="63" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="Montserrat,sans-serif">{total} üzerinden</text>
      </svg>
      <span className={styles.donutLabel}>Aktif modüller</span>
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
  { key: 'sicherheitsbedarf',    label: 'Güvenlik' },
  { key: 'automatisierungsbedarf', label: 'Otomasyon' },
  { key: 'wartungsbedarf',       label: 'Bakım' },
  { key: 'kommunikationsbedarf', label: 'İletişim' },
  { key: 'notfallmanagement',    label: 'Acil durum' },
]

const lvls = ['İhtiyaç yok', 'Düşük', 'Orta', 'Yüksek', 'Çok yüksek']
const bClrs = ['var(--border)', 'var(--status-green)', '#E8A020', '#D4640A', 'var(--status-red)']

function NeedsChart({ formData }) {
  const bars = needsKeys.map(({ key, label }) => {
    const idx = lvls.indexOf(formData[key] || '')
    return { label, pct: idx <= 0 ? 0 : (idx / (lvls.length - 1)) * 100, color: bClrs[Math.max(idx, 0)], val: formData[key] || '' }
  }).filter(b => b.pct > 0)

  if (!bars.length) return <p className={styles.noData}>Herhangi bir ihtiyaç bilgisi girilmedi.</p>

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
          <h1 className={styles.successTitle}>Talep gönderildi</h1>
          <p className={styles.successText}>Sistem yapılandırmanız başarıyla gönderildi. Wiseness ekibi kısa süre içinde sizinle iletişime geçecektir.</p>
          {formData.firmenname && <div className={styles.successMeta}>{formData.firmenname}{formData.email && ` · ${formData.email}`}</div>}
          <button className={styles.backBtn} onClick={onBack}>Ana sayfaya dön</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backLink} onClick={onBack}>
          <Icon name="chevronRight" size={14} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
          Geri
        </button>
        <div>
          <h1 className={styles.pageTitle}>Sistem önerisi ve proje özeti</h1>
          <p className={styles.pageSubtitle}>Girdiğiniz bilgilere göre otomatik oluşturuldu</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="chart" size={14} color="var(--text-muted)" /><span>Sistem analizi</span></div>
