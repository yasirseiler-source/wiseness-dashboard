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
          placeholder="örn. ABC Teknoloji A.Ş."
          required
          {...f('firmenname')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Yetkili Kişi *</label>
        <input
          className="form-input"
          placeholder="Ad Soyad"
          required
          {...f('ansprechpartner')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Telefon</label>
        <input
          className="form-input"
          type="tel"
          placeholder="+90 5xx xxx xx xx"
          {...f('telefon')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">E-Posta *</label>
        <input
          className="form-input"
          type="email"
          placeholder="info@firma.com"
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
          <option value="">Lütfen seçiniz</option>
          <option>Bakım / Sağlık</option>
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
          <option value="">Lütfen seçiniz</option>
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
