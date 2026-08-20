'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import type { Imovel } from '@/types/imovel'

export default function AdminListaImoveisPage() {
  const router = useRouter()
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const { data: sessao } = await supabase.auth.getSession()
      if (!sessao.session) {
        router.push('/admin/login')
        return
      }

      const { data } = await supabase
        .from('imoveis')
        .select('*')
        .order('criado_em', { ascending: false })

      setImoveis(data ?? [])
      setCarregando(false)
    }
    carregar()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta propiedad? Esta acción no se puede deshacer.')) return
    await supabase.from('imoveis').delete().eq('id', id)
    setImoveis((prev) => prev.filter((i) => i.id !== id))
  }

  async function handleToggleDestaque(id: string, valorAtual: boolean) {
    await supabase.from('imoveis').update({ destaque: !valorAtual }).eq('id', id)
    setImoveis((prev) =>
      prev.map((i) => (i.id === id ? { ...i, destaque: !valorAtual } : i))
    )
  }

  async function handleToggleStatus(id: string, statusAtual: string) {
    const novoStatus = statusAtual === 'inativo' ? 'disponivel' : 'inativo'
    await supabase.from('imoveis').update({ status: novoStatus }).eq('id', id)
    setImoveis((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: novoStatus as Imovel['status'] } : i))
    )
  }

  if (carregando) {
    return <div className="max-w-container mx-auto px-6 py-10 text-sm text-gris">Cargando...</div>
  }

  return (
    <div className="max-w-container mx-auto px-6 py-10 md:px-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-xl text-carbon">Panel — Propiedades</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/imoveis/novo"
            className="rounded-md bg-dorado px-4 py-2 text-xs font-medium text-crema"
          >
            + Nueva propiedad
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md border border-dorado-light px-4 py-2 text-xs text-carbon"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {imoveis.length === 0 ? (
        <p className="text-sm text-gris">Todavía no hay propiedades cargadas.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-dorado-light">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs text-gris">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Barrio</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Disponible</th>
                <th className="px-4 py-3">Destacada</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel) => {
                const disponivel = imovel.status !== 'inativo'
                return (
                  <tr key={imovel.id} className="border-t border-surface">
                    <td className="px-4 py-3 text-carbon">{imovel.titulo}</td>
                    <td className="px-4 py-3 text-gris">{imovel.bairro}</td>
                    <td className="px-4 py-3 text-dorado">
                      USD {imovel.preco.toLocaleString('es-AR')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(imovel.id, imovel.status)}
                        className={
                          disponivel
                            ? 'rounded-full bg-dorado px-3 py-1 text-xs text-crema'
                            : 'rounded-full border border-dorado-light px-3 py-1 text-xs text-gris'
                        }
                      >
                        {disponivel ? 'Disponible' : 'No disponible'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleDestaque(imovel.id, imovel.destaque)}
                        className={
                          imovel.destaque
                            ? 'rounded-full bg-dorado px-3 py-1 text-xs text-crema'
                            : 'rounded-full border border-dorado-light px-3 py-1 text-xs text-gris'
                        }
                      >
                        {imovel.destaque ? 'Sí' : 'No'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/imoveis/${imovel.id}/editar`}
                        className="mr-4 text-xs text-dorado"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(imovel.id)}
                        className="text-xs text-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
