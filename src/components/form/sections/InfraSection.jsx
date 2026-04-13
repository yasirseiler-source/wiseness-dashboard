export default function InfraSection({ formData, onUpdate }) {
  const f = (key, type = 'text') => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
    type,
  })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Vorhandene Kameras (Anzahl)</label>
        <input className="form-input" placeholder="z.B. 8" {...f('vorhandeneKameras', 'number')} />
      </div>
      <div className="form-group">
        <label className="form-label">Vorhandene Sensoren</label>
        <input className="form-input" placeholder="z.B. Bewegung, Rauch" {...f('vorhandeneSensoren')} />
      </div>
      <div className="form-group">
        <label className="form-label">Maschinen vorhanden</label>
        <input className="form-input" placeholder="z.B. CNC, Förderband" {...f('vorhandeneMaschinen')} />
      </div>
      <div className="form-group">
        <label className="form-label">Software / Systeme aktuell</label>
        <input className="form-input" placeholder="z.B. SAP, eigene Software" {...f('vorhandeneSoftware')} />
      </div>
      <div className="form-group">
        <label className="form-label">Netzwerkstruktur vorhanden</label>
        <select className="form-select" value={formData.vorhandenesNetzwerk || ''} onChange={(e) => onUpdate('vorhandenesNetzwerk', e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option>Ja, strukturiert (VLAN/Managed)</option>
          <option>Ja, einfach (Flat Network)</option>
          <option>Nein / Nicht bekannt</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Server vorhanden</label>
        <select className="form-select" value={formData.serverVorhanden || ''} onChange={(e) => onUpdate('serverVorhanden', e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
          <option value="cloud">Cloud-Lösung</option>
        </select>
      </div>
    </div>
  )
}
