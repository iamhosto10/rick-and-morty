import { useState, useCallback } from 'react'
import { fetchRandomCharacters } from '@/services/rickAndMortyApi'
import { shuffleArray } from '@/utils/shuffle'
import { type MemoryCard } from '@/types/game'

export const useDeck = () => {
  const [deck, setDeck] = useState<MemoryCard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateDeck = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const characters = await fetchRandomCharacters(6)

      const pairedCharacters = [...characters, ...characters]

      const initialCards: MemoryCard[] = pairedCharacters.map((char) => ({
        uniqueId: crypto.randomUUID(),
        character: char,
        isFlipped: false,
        isMatched: false,
      }))

      const shuffledCards = shuffleArray(initialCards)

      setDeck(shuffledCards)
    } catch (err) {
      setError('Hubo un problema al cargar las cartas. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { deck, setDeck, isLoading, error, generateDeck }
}
