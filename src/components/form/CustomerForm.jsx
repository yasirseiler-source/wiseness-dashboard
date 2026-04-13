import { useState } from 'react'
import Icon from '../ui/Icon'
import CompanySection from './sections/CompanySection'
import BuildingSection from './sections/BuildingSection'
import PeopleSection from './sections/PeopleSection'
import InfraSection from './sections/InfraSection'
import NeedsSection from './sections/NeedsSection'
import BudgetSection from './sections/BudgetSection'
import styles from './CustomerForm.module.css'

const sections = [
  { id: 'company',  label: 'Unternehmensdaten',  icon: 'briefcase',    component: CompanySection },
  { id: 'building', label: 'Gebäude & Struktur', icon: 'building',     component: BuildingSection },
  { id: 'people',   label: 'Personal & Nutzer',  icon: 'users',        component: PeopleSection },
  { id: 'infra',    label: 'Bestehende Systeme', icon: 'settings',     component: InfraSection },
  { id: 'needs',    label: 'Bedarf & Ziele',     icon: 'target',       component: NeedsSection },
  { id: 'budget',   label: 'Budget & Priorität', icon: 'dollar',       component: BudgetSection },
]

export default function CustomerForm({ formData, onUpdate }) {
  const [openSection, setOpenSection] = useState('company')

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <Icon name="file" size={14} color="var(--text-muted)" />
        <span>Kundendaten erfassen</span>
      </div>
      <div className={styles.accordion}>
        {sections.map((section, idx) => {
          const Comp = section.component
          const isOpen = openSection === section.id
          return (
            <div key={section.id} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
              <button
                className={styles.header}
                onClick={() => setOpenSection(isOpen ? null : section.id)}
              >
                <span className={styles.stepNum}>{String(idx + 1).padStart(2, '0')}</span>
                <Icon name={section.icon} size={14} color={isOpen ? 'var(--primary)' : 'var(--text-muted)'} />
                <span className={styles.headerLabel}>{section.label}</span>
                <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={14} color="var(--text-muted)" />
              </button>
              {isOpen && (
                <div className={styles.body}>
                  <Comp formData={formData} onUpdate={onUpdate} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
