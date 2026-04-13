export default function BudgetSection({ formData, onUpdate }) {
  const sel = (key) => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
  })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Budgetrahmen</label>
        <select className="form-select" {...sel('budgetrahmen')}>
          <option value="">Bitte auswählen</option>
          <option>Unter 10.000 €</option>
          <option>10.000 – 25.000 €</option>
          <option>25.000 – 50.000 €</option>
          <option>50.000 – 100.000 €</option>
          <option>Über 100.000 €</option>
          <option>Noch nicht definiert</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Priorität</label>
        <select className="form-select" {...sel('prioritaet')}>
          <option value="">Bitte auswählen</option>
          <option>Niedrig</option>
          <option>Mittel</option>
          <option>Hoch</option>
          <option>Sehr hoch / Dringend</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Umsetzungszeitraum</label>
        <select className="form-select" {...sel('umsetzungszeitraum')}>
          <option value="">Bitte auswählen</option>
          <option>Sofort (innerhalb 1 Monat)</option>
          <option>Kurzfristig (1–3 Monate)</option>
          <option>Mittelfristig (3–6 Monate)</option>
          <option>Langfristig (6+ Monate)</option>
          <option>Noch offen</option>
        </select>
      </div>
    </div>
  )
}
