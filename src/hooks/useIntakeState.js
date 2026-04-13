import { useState, useCallback, useMemo } from 'react'

const defaultFormData = {
  firmenname: '', ansprechpartner: '', telefon: '', email: '',
  standort: '', branche: '', objekttyp: '',
  gesamtflaeche: '', anzahlEtagen: '', anzahlRaeume: '', anzahlBereiche: '',
  innenbereiche: '', aussenbereiche: '',
  anzahlMitarbeiter: '', anzahlBewohner: '', schichtsystem: '', besucheraufkommen: '',
  vorhandeneKameras: '', vorhandeneSensoren: '', vorhandeneMaschinen: '',
  vorhandeneSoftware: '', vorhandenesNetzwerk: '', serverVorhanden: '',
  sicherheitsbedarf: '', automatisierungsbedarf: '', aufgabenmanagement: '',
  wartungsbedarf: '', kommunikationsbedarf: '', energieueberwachung: '',
  notfallmanagement: '', freitextWuensche: '',
  budgetrahmen: '', prioritaet: '', umsetzungszeitraum: '',
}

function calcSystemSize({ raeume, mitarbeiter, moduleCount, totalModules }) {
  const r = Number(raeume) || 0
  const m = Number(mitarbeiter) || 0
  if (moduleCount === totalModules && totalModules > 0) return 'XL'
  if (r > 60 || m > 100 || moduleCount >= 9) return 'XL'
  if (r > 30 || m > 50 || moduleCount >= 7) return 'L'
  if (r > 10 || m > 20 || moduleCount >= 5) return 'M'
  return 'S'
}

function calcCameras({ raeume, aussenbereiche }) {
  const r = Number(raeume) || 0
  const a = Number(aussenbereiche) || 0
  return Math.max(Math.ceil(r / 4) + Math.ceil(a / 2), 2)
}

function generateTechnicalHints({ systemSize, selectedModules, selectedSensors, formData }) {
  const hints = []
  if (systemSize === 'XL') hints.push('Ein XL-System erfordert eine dedizierte Serverinfrastruktur und redundante Netzwerkanbindung.')
  if (systemSize === 'L' || systemSize === 'XL') hints.push('Eine strukturierte Netzwerksegmentierung (VLAN) wird empfohlen.')
  if (selectedSensors.includes('Zugangskontrolle')) hints.push('Zugangskontrolle erfordert ggf. Schnittstellen zu bestehenden Schließsystemen.')
  if (selectedModules.includes('Vitaldaten-Schnittstellen')) hints.push('Vitaldaten-Integration benötigt HL7/FHIR-kompatible Geräteschnittstellen.')
  if (selectedModules.includes('Alarm- und Eskalationslogik') || selectedModules.includes('Notrufsystem')) hints.push('Notruf- und Alarmsysteme sollten auf redundanten Leitungen betrieben werden.')
  if (selectedSensors.includes('RFID / Materialtracking')) hints.push('RFID-Tracking erfordert Tag-Infrastruktur und Reader-Positionierung vor Ort.')
  if (formData.vorhandeneKameras && Number(formData.vorhandeneKameras) > 0) hints.push(`${formData.vorhandeneKameras} vorhandene Kameras können ggf. in das neue System integriert werden.`)
  if (formData.serverVorhanden === 'ja') hints.push('Vorhandener Server kann als Basis für die lokale Datenverarbeitung genutzt werden.')
  if (hints.length === 0) hints.push('Standardinstallation — keine besonderen technischen Anforderungen erkannt.')
  return hints
}

export function useIntakeState(vertical) {
  const [kpis, setKpis] = useState({})
  const [selectedModules, setSelectedModules] = useState(
    () => new Set((vertical?.modules || []).map(m => m.name))
  )
  const [selectedSensors, setSelectedSensors] = useState(
    () => new Set((vertical?.sensors || []).map(s => s.name))
  )
  // sensorMode: 'auto' | 'manual'
  const [sensorMode, setSensorMode] = useState('auto')
  // sensorQuantities: { [sensorName]: number }
  const [sensorQuantities, setSensorQuantities] = useState({})
  const [formData, setFormData] = useState(defaultFormData)

  const toggleModule = useCallback((name) => {
    setSelectedModules((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }, [])

  const toggleSensor = useCallback((name) => {
    setSelectedSensors((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }, [])

  const updateSensorQty = useCallback((name, value) => {
    setSensorQuantities(prev => ({ ...prev, [name]: value }))
  }, [])

  const updateKpi = useCallback((key, value) => {
    setKpis((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateForm = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const moduleCount = selectedModules.size
  const totalModules = vertical?.modules?.length || 10

  const raeume = formData.anzahlRaeume || kpis.zimmer || kpis.raeume || ''
  const mitarbeiter = formData.anzahlMitarbeiter || kpis.mitarbeiter || kpis.pflegekraefte || ''

  const systemSize = calcSystemSize({ raeume, mitarbeiter, moduleCount, totalModules })
  const cameraCount = calcCameras({ raeume, aussenbereiche: formData.aussenbereiche })

  // Compute effective sensor quantities
  const effectiveSensorQty = useMemo(() => {
    if (!vertical?.sensors) return {}
    const result = {}
    for (const s of vertical.sensors) {
      if (!selectedSensors.has(s.name)) continue
      if (sensorMode === 'manual' && sensorQuantities[s.name] !== undefined) {
        result[s.name] = Number(sensorQuantities[s.name]) || 0
      } else {
        // auto: autoCount * relevant base (rooms or machines)
        const base = Number(raeume) || Number(kpis.maschinen) || 1
        result[s.name] = Math.max(s.autoCount * Math.ceil(base / 5), s.autoCount)
      }
    }
    return result
  }, [vertical, selectedSensors, sensorMode, sensorQuantities, raeume, kpis.maschinen])

  const technicalHints = generateTechnicalHints({
    systemSize,
    selectedModules: Array.from(selectedModules),
    selectedSensors: Array.from(selectedSensors),
    formData,
  })

  const resetForVertical = useCallback((v) => {
    setKpis({})
    setSelectedModules(new Set((v?.modules || []).map(m => m.name)))
    setSelectedSensors(new Set((v?.sensors || []).map(s => s.name)))
    setSensorMode('auto')
    setSensorQuantities({})
    setFormData(defaultFormData)
  }, [])

  return {
    kpis, selectedModules, selectedSensors,
    sensorMode, setSensorMode,
    sensorQuantities, updateSensorQty, effectiveSensorQty,
    formData, toggleModule, toggleSensor,
    updateKpi, updateForm,
    systemSize, cameraCount, technicalHints,
    moduleCount, sensorCount: selectedSensors.size,
    totalModules, resetForVertical,
  }
}
