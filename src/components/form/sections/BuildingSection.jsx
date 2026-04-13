export default function BuildingSection({ formData, onUpdate }) {
  const f = (key, type = 'text') => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
    type,
  })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Gesamtfläche (m²)</label>
        <input className="form-input" placeholder="z.B. 2500" {...f('gesamtflaeche', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Anzahl Etagen</label>
        <input className="form-input" placeholder="z.B. 3" {...f('anzahlEtagen', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Anzahl Räume</label>
        <input className="form-input" placeholder="z.B. 40" {...f('anzahlRaeume', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Anzahl Bereiche</label>
        <input className="form-input" placeholder="z.B. 6" {...f('anzahlBereiche', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Innenbereiche</label>
        <input className="form-input" placeholder="z.B. Flure, Lobby, Büros" {...f('innenbereiche')} />
      </div>
      <div className="form-group">
        <label className="form-label">Außenbereiche</label>
        <input className="form-input" placeholder="z.B. Parkplatz, Einfahrt" {...f('aussenbereiche')} />
      </div>
    </div>
  )
}
