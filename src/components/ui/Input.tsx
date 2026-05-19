import { type InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    const togglePassword = () => setShowPassword((prev) => !prev)

    return (
      <div className="flex w-full flex-col space-y-1.5">
        <label
          htmlFor={inputId}
          className="text-[20px] font-bold text-[#313D49]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'flex h-11 w-full rounded-md border border-[#212C31] bg-[#FFFAC2] px-3 py-2 text-sm text-[#8C93A6]',
              'focus:border-transparent focus:ring-2 focus:ring-[#21747D] focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isPassword && 'pr-10',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8C93A6] hover:text-[#8C93A6]/80 focus:outline-none"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-.722-3.25" />
                  <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                  <path d="m20 15-1.726-2.05" />
                  <path d="m4 15 1.726-2.05" />
                  <path d="m9 18 .722-3.25" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
