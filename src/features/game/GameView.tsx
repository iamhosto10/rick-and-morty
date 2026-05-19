import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeck } from './hooks/useDeck'
import { useGameEngine } from './hooks/useGameEngine'
import { MemoryCard } from './components/MemoryCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'
import logo from '/src/assets/rickymorty.png'

export const GameView = () => {
  const { deck, setDeck, isLoading, error, generateDeck } = useDeck()
  const {
    gameState,
    turns,
    matches,
    isLocked,
    startGame,
    handleCardClick,
    resetStats,
  } = useGameEngine(deck, setDeck)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    generateDeck()
  }, [generateDeck])

  const handleRestart = () => {
    resetStats()
    generateDeck()
  }

  const handleGoHome = () => {
    logout()
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="animate-pulse text-xl font-bold text-white">
        Generando portal dimensional...
      </div>
    )
  }

  if (error) {
    return <div className="font-bold text-red-400">{error}</div>
  }

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pt-8">
      <div className="mb-6 flex flex-col items-center">
        <img src={logo} alt="Rick and Morty Logo" className="mb-8 h-35 w-100" />
        <span className="rounded-full bg-[#D8E054] px-4 py-2 text-[20px] font-bold text-[#000000]">
          Juego de memoria
        </span>
      </div>

      <Card className="flex h-full w-full max-w-5xl flex-col gap-2 rounded-t-2xl rounded-b-none bg-[#FFFAC2]">
        {gameState === 'finished' && (
          <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
            <h2 className="text-[48px] font-bold text-[#233A59]">
              ¡Felicitaciones!
            </h2>
            <p className="text-[24px] font-medium text-[#233A59]">
              Terminaste el juego con {turns} turnos
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                variant="primary"
                onClick={handleRestart}
                className="min-w-30"
              >
                Repetir
              </Button>
              <Button
                variant="secondary"
                onClick={handleGoHome}
                className="min-w-30"
              >
                Inicio
              </Button>
            </div>
          </div>
        )}

        {gameState !== 'finished' && (
          <div className="flex w-full flex-col">
            <div className="mb-6 flex items-center justify-between px-2">
              {gameState === 'idle' ? (
                <h2 className="text-[24px] font-bold text-[#000000]">
                  Personajes
                </h2>
              ) : (
                <>
                  <span className="text-[24px] font-bold text-[#000000]">
                    Aciertos: {matches}
                  </span>
                  <span className="text-[24px] font-bold text-[#000000]">
                    Turnos: {turns}
                  </span>
                </>
              )}
            </div>

            <div className="mx-auto mb-8 grid w-full max-w-2xl grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4">
              {deck.map((card) => (
                <MemoryCard
                  key={card.uniqueId}
                  card={{
                    ...card,
                    isFlipped: gameState === 'idle' ? true : card.isFlipped,
                  }}
                  onClick={handleCardClick}
                  disabled={
                    isLocked ||
                    gameState !== 'playing' ||
                    card.isFlipped ||
                    card.isMatched
                  }
                />
              ))}
            </div>

            {gameState === 'idle' && (
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  onClick={startGame}
                  className="w-full max-w-xs text-lg"
                >
                  Jugar
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
