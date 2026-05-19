import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md px-6 py-2.5 font-bold text-white transition-transform  disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

    const variants = {
      primary:
        'bg-[#A2F2F9] hover:bg-[#49D5E1] active:bg-[#1A7A83] text-[#233A59] shadow-[-4px_4px_0px_0px_#D8E054] hover:shadow-[-4px_4px_0px_0px_#E6EC59] active:shadow-[-2px_2px_0px_0px_#E6EC59] font-semibold text-[24px] text-[#233A59] active:text-[#FFFFFF]',
      secondary:
        'bg-[#D8E054] text-[#233A59] hover:bg-[#B1B83B] active:bg-[#73781C] shadow-[-4px_4px_0px_0px_#A2F2F9] font-semibold text-[24px] text-[#233A59] active:text-[#FFFFFF]',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
