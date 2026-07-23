'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    setCarregando(false)

    if (error) {
      setErro('Email o contraseña incorrectos.')
      return
    }

    router.push('/admin/imoveis')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <h1 className="mb-6 text-center font-heading text-xl text-carbon">
        Panel de administración
      </h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs text-gris">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gris">Contraseña</label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>
        {erro && <p className="text-xs text-red-600">{erro}</p>}
        <button
          type="submit"
          disabled={carregando}
          className="rounded-md bg-dorado px-4 py-2 text-sm font-medium text-crema disabled:opacity-60"
        >
          {carregando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
