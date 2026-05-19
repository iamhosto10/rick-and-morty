import { type Character } from '@/types/game'

const API_BASE_URL = 'https://rickandmortyapi.com/api'
const TOTAL_CHARACTERS = 826

const getRandomIds = (count: number): number[] => {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * TOTAL_CHARACTERS) + 1)
  }
  return Array.from(ids)
}

export const fetchRandomCharacters = async (
  count: number = 6,
): Promise<Character[]> => {
  const ids = getRandomIds(count)

  try {
    const response = await fetch(`${API_BASE_URL}/character/${ids.join(',')}`)

    if (!response.ok) {
      throw new Error('Error al obtener los personajes')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Rick and Morty API:', error)
    throw error
  }
}
