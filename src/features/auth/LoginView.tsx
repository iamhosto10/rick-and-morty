import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import logo from '/src/assets/rickymorty.png'

export const LoginView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError('Por favor, ingresa tu usuario y contraseña.')
      return
    }

    login(username)

    navigate('/game')
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Card className="flex h-164.25 w-153 flex-col items-center gap-11 rounded-[14px] bg-[#FFFAC2] p-8 shadow-lg">
        <img src={logo} alt="Rick and Morty Logo" className="mb-8 h-28 w-80" />
        <form onSubmit={handleSubmit} className="flex w-124.5 flex-col gap-6">
          <Input
            label="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej. RickS"
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && (
            <p className="text-sm font-semibold text-red-500">{error}</p>
          )}

          <div className="flex flex-col items-center space-y-4 pt-4">
            <Button type="submit" variant="primary" className="w-full">
              Iniciar sesión
            </Button>
            <button
              type="button"
              className="text-[24px] font-semibold text-[#465669] transition-colors hover:text-[#465669]/80"
            >
              ¿Olvidaste tu usuario o contraseña?
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
