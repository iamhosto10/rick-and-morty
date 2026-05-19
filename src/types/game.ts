export interface Character {
  id: number
  name: string
  image: string
  status: string
  species: string
}

export interface MemoryCard {
  uniqueId: string
  character: Character
  isFlipped: boolean
  isMatched: boolean
}
