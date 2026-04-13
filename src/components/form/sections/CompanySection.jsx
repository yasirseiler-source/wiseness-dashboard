export default function CompanySection({ formData, onUpdate }) {
  const f = (key) => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
  })
  return (
    <div className="grid-2" style={{ gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Firmenname *</label>
        <input className="form-input" placeholder="z.B. Muster GmbH" {...f('firmenname')} />
      </div>
      <div className="form-group">
        <label className="form-label">Ansprechpartner</label>
        <input className="form-input" placeholder="Vor- und Nachname" {...f('ansprechpartner')} />
      </div>
      <div className="form-group">
        <label className="form-label">Telefon</label>
        <input className="form-input" type="tel" placeholder="+49 ..." {...f('telefon')} />
      </div>
      <div className="form-group">
        <label className="form-label">E-Mail</label>
        <input className="form-input" type="email" placeholder="info@unternehmen.de" {...f('email')} />
      </div>
      <div className="form-group">
        <label className="form-label">Standort / Stadt</label>
        <input className="form-input" placeholder="z.B. München" {...f('standort')} />
      </div>
      <div className="form-group">
        <label className="form-label">Branche</label>
        <select className="form-select" {...f('branche')}>
          <option value="">Bitte auswählen</option>
          <option>Pflege / Medizin</option>
          <option>Produktion / Fertigung</option>
          <option>Logistik / Lager</option>
          <option>Büro / Verwaltung</option>
          <option>Dienstleistung</option>
          <option>Sonstiges</option>
        </select>
      </div>
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Objekttyp</label>
        <select className="form-select" {...f('objekttyp')}>
          <option value="">Bitte auswählen</option>
          <option>Pflegeheim / Huzurevi</option>
          <option>Klinik / Krankenhaus</option>
          <option>Fabrik / Werk</option>
          <option>Lager / Logistikzentrum</option>
          <option>Bürogebäude</option>
          <option>Verwaltungszentrum</option>
          <option>Gemischte Nutzung</option>
        </select>
      </div>
    </div>
  )
}
