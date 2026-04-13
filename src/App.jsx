import { useState, useCallback } from 'react'
import { verticals } from './data/verticals'
import { useIntakeState } from './hooks/useIntakeState'
import Navbar from './components/layout/Navbar'
import LandingPage from './components/landing/LandingPage'
import VerticalPage from './components/vertical/VerticalPage'
import FinalPage from './components/summary/FinalPage'
import './styles/globals.css'

export default function App() {
  const [page, setPage] = useState('landing')
  const [activeVerticalId, setActiveVerticalId] = useState(null)

  const activeVertical = verticals.find((v) => v.id === activeVerticalId) || null
  const state = useIntakeState(activeVertical)

  const navigate = useCallback(
    (targetPage, verticalId) => {
      if (targetPage === 'landing') {
        setPage('landing')
        setActiveVerticalId(null)
        return
      }
      if (targetPage === 'vertical') {
        const v = verticals.find((vv) => vv.id === verticalId)
        if (!v) return
        if (verticalId !== activeVerticalId) {
          state.resetForVertical(v)
          setActiveVerticalId(verticalId)
        }
        setPage('vertical')
        return
      }
      if (targetPage === 'final') setPage('final')
    },
    [activeVerticalId, state]
  )

  // Enrich state with totalModules for FinalPage
  const enrichedState = {
    ...state,
    totalModules: activeVertical?.modules?.length || 10,
  }

  return (
    <>
      <Navbar currentPage={page} activeVertical={activeVertical} onNavigate={navigate} />
      {page === 'landing' && <LandingPage onNavigate={navigate} />}
      {page === 'vertical' && activeVertical && (
        <VerticalPage vertical={activeVertical} state={enrichedState} onNavigateFinal={() => navigate('final')} />
      )}
      {page === 'final' && (
        <FinalPage state={enrichedState} vertical={activeVertical} onBack={() => navigate('landing')} />
      )}
    </>
  )
}
