export default function CompanySection({ formData, onUpdate }) {
  const f = (key) => ({
    value: formData[key] || '',
    onChange: (e) => onUpdate(key, e.target.value),
  })

  return (
    <div className="grid-2" style={{ gap: '14px' }}>
      <div className="form-group">
        <label className="form-label">Firma Adı *</label>
        <input
          className="form-input"
          placeholder="örn. Örnek A.Ş."
          required
          {...f('firmenname')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">İlgili Kişi *</label>
        <input
          className="form-input"
          placeholder="Ad ve soyad"
          required
          {...f('ansprechpartner')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Telefon</label>
        <input
          className="form-input"
          type="tel"
          placeholder="+90 ..."
          {...f('telefon')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">E-Posta *</label>
        <input
          className="form-input"
          type="email"
          placeholder="info@sirket.com"
          required
          {...f('email')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Konum / Şehir</label>
        <input
          className="form-input"
          placeholder="örn. İstanbul"
          {...f('standort')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Sektör</label>
        <select className="form-select" {...f('branche')}>
          <option value="">Lütfen seçin</option>
          <option>Bakım / Tıp</option>
          <option>Üretim / İmalat</option>
          <option>Lojistik / Depo</option>
          <option>Ofis / Yönetim</option>
          <option>Hizmet</option>
          <option>Diğer</option>
        </select>
      </div>

      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Yapı Türü</label>
        <select className="form-select" {...f('objekttyp')}>
          <option value="">Lütfen seçin</option>
          <option>Bakım Evi / Huzurevi</option>
          <option>Klinik / Hastane</option>
          <option>Fabrika / Tesis</option>
          <option>Depo / Lojistik Merkezi</option>
          <option>Ofis Binası</option>
          <option>Yönetim Merkezi</option>
          <option>Karma Kullanım</option>
        </select>
      </div>
    </div>
  )
}
