export default function PeopleSection({ formData, onUpdate }) {
  const f = (key, type = 'text') => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
    type,
  })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Anzahl Mitarbeiter</label>
        <input className="form-input" placeholder="z.B. 45" {...f('anzahlMitarbeiter', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Anzahl Bewohner / Nutzer</label>
        <input className="form-input" placeholder="z.B. 80" {...f('anzahlBewohner', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Schichtsystem</label>
        <select className="form-select" value={formData.schichtsystem || ''} onChange={(e) => onUpdate('schichtsystem', e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option>Kein Schichtsystem</option>
          <option>2-Schicht (Tag/Nacht)</option>
          <option>3-Schicht (Früh/Spät/Nacht)</option>
          <option>24/7-Betrieb</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Besucheraufkommen</label>
        <select className="form-select" value={formData.besucheraufkommen || ''} onChange={(e) => onUpdate('besucheraufkommen', e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option>Gering (0–20/Tag)</option>
          <option>Mittel (20–100/Tag)</option>
          <option>Hoch (100+/Tag)</option>
        </select>
      </div>
    </div>
  )
}
