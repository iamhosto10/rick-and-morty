import { type MemoryCard as MemoryCardType } from '@/types/game'
import { cn } from '@/utils/cn'

interface MemoryCardProps {
  card: MemoryCardType
  onClick: (card: MemoryCardType) => void
  disabled: boolean
}

export const MemoryCard = ({ card, onClick, disabled }: MemoryCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!disabled) onClick(card)
    }
  }

  if (card.isMatched) {
    return (
      <div className="pointer-events-none h-full w-full opacity-0 transition-opacity duration-500" />
    )
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onClick(card)}
      onKeyDown={handleKeyDown}
      className={cn(
        'perspective-1000 group relative aspect-3/4 w-full cursor-pointer',
        disabled && 'cursor-not-allowed',
      )}
      aria-label={`Carta de ${card.character.name}`}
      aria-disabled={disabled}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-lg shadow-md transition-transform duration-500 transform-3d sm:rounded-xl',
          card.isFlipped ? 'transform-[rotateY(180deg)]' : '',
        )}
      >
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg border-2 border-[#6EE3E6] bg-[#89F4F6] p-1 backface-hidden sm:rounded-xl sm:p-2">
          <img src="/src/assets/reversecard.png" alt="Portal" />
        </div>

        <div className="absolute inset-0 flex h-full w-full transform-[rotateY(180deg)] flex-col gap-2 overflow-hidden rounded-lg bg-[#FFFFFF] p-4 backface-hidden sm:rounded-xl">
          <div className="h-[65%] w-full bg-[#FFFFFF]">
            <img
              src={card.character.image}
              alt={card.character.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center px-1 py-0.5 sm:px-2 sm:py-1">
            <h3 className="truncate text-[16px] font-bold text-[#233A59] sm:text-xs md:text-sm">
              {card.character.name}
            </h3>
            <p className="mt-0.5 truncate text-[10px] text-[#000000] sm:text-[10px] md:text-xs">
              {card.character.status} - {card.character.species}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
