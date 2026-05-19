import { useState, useEffect, useCallback, useRef } from 'react'
import { type MemoryCard } from '@/types/game'

type GameState = 'idle' | 'memorizing' | 'playing' | 'finished'

export const useGameEngine = (
  deck: MemoryCard[],
  setDeck: React.Dispatch<React.SetStateAction<MemoryCard[]>>,
) => {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([])
  const [matches, setMatches] = useState(0)
  const [turns, setTurns] = useState(0)

  const [isLocked, setIsLocked] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startGame = useCallback(() => {
    setGameState('memorizing')
    setIsLocked(true)

    setDeck((prev) => prev.map((card) => ({ ...card, isFlipped: true })))

    timerRef.current = setTimeout(() => {
      setDeck((prev) => prev.map((card) => ({ ...card, isFlipped: false })))
      setIsLocked(false)
      setGameState('playing')
    }, 3000)
  }, [setDeck])

  const handleCardClick = (clickedCard: MemoryCard) => {
    if (isLocked || clickedCard.isFlipped || clickedCard.isMatched) return

    setDeck((prev) =>
      prev.map((card) =>
        card.uniqueId === clickedCard.uniqueId
          ? { ...card, isFlipped: true }
          : card,
      ),
    )

    setFlippedCards((prev) => [...prev, { ...clickedCard, isFlipped: true }])
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsLocked(true)
      const [card1, card2] = flippedCards

      const isMatch = card1.character.id === card2.character.id

      timerRef.current = setTimeout(() => {
        if (isMatch) {
          setDeck((prev) =>
            prev.map((card) =>
              card.uniqueId === card1.uniqueId ||
              card.uniqueId === card2.uniqueId
                ? { ...card, isMatched: true, isFlipped: false }
                : card,
            ),
          )
          setMatches((prev) => prev + 1)
          setTurns((prev) => prev + 1)
        } else {
          setDeck((prev) =>
            prev.map((card) =>
              card.uniqueId === card1.uniqueId ||
              card.uniqueId === card2.uniqueId
                ? { ...card, isFlipped: false }
                : card,
            ),
          )
          setTurns((prev) => prev + 1)
        }
        setFlippedCards([])
        setIsLocked(false)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [flippedCards, setDeck])
  useEffect(() => {
    if (deck.length > 0 && matches === deck.length / 2) {
      setGameState('finished')
    }
  }, [matches, deck.length])
  const resetStats = useCallback(() => {
    setFlippedCards([])
    setMatches(0)
    setTurns(0)
    setGameState('idle')
    setIsLocked(false)
  }, [])

  return {
    gameState,
    turns,
    matches,
    isLocked,
    startGame,
    handleCardClick,
    resetStats,
  }
}
