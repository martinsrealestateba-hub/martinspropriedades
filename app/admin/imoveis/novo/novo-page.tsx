'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function gerarSlug(titulo: string) {
  const base = titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const sufixo = Math.random().toString(36).slice(2, 7)
  return `${base}-${sufixo}`
}

export default function NovoImovelPage() {
  const router = useRouter()
  const [verificandoSessao, setVerificandoSessao] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [fotos, setFotos] = useState<FileList | null>(null)

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    tipo: 'apartamento',
    finalidade: 'aluguel',
    preco: '',
    endereco: '',
    bairro: '',
    cidade: 'Buenos Aires',
    estado: 'CABA',
    area_total: '',
    quartos: '0',
    banheiros: '0',
    vagas_garagem: '0',
    destaque: false,
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/admin/login')
      } else {
        setVerificandoSessao(false)
      }
    })
  }, [router])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setSalvando(true)

    try {
      const slug = gerarSlug(form.titulo)

      const { data: imovelCriado, error: erroImovel } = await supabase
        .from('imoveis')
        .insert({
          slug,
          titulo: form.titulo,
          descricao: form.descricao || null,
          tipo: form.tipo,
          finalidade: form.finalidade,
          preco: Number(form.preco),
          endereco: form.endereco || null,
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.estado,
          area_total: form.area_total ? Number(form.area_total) : null,
          quartos: Number(form.quartos),
          banheiros: Number(form.banheiros),
          vagas_garagem: Number(form.vagas_garagem),
          status: 'disponivel',
          destaque: form.destaque,
        })
        .select('id')
        .single()

      if (erroImovel || !imovelCriado) {
        throw new Error(erroImovel?.message || 'No se pudo crear la propiedad.')
      }

      if (fotos && fotos.length > 0) {
        for (let i = 0; i < fotos.length; i++) {
          const arquivo = fotos[i]
          const nomeArquivo = `${slug}-${i}-${Date.now()}.${arquivo.name.split('.').pop()}`

          const { error: erroUpload } = await supabase.storage
            .from('imoveis-fotos')
            .upload(nomeArquivo, arquivo)

          if (erroUpload) {
            throw new Error('Error al subir la foto ' + (i + 1) + ': ' + erroUpload.message)
          }

          const { data: urlPublica } = supabase.storage
            .from('imoveis-fotos')
            .getPublicUrl(nomeArquivo)

          await supabase.from('imagens_imovel').insert({
            imovel_id: imovelCriado.id,
            url: urlPublica.publicUrl,
            ordem: i,
            capa: i === 0,
          })
        }
      }

      router.push('/admin/imoveis')
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
      setSalvando(false)
    }
  }

  if (verificandoSessao) {
    return <div className="max-w-container mx-auto px-6 py-10 text-sm text-gris">Cargando...</div>
  }

  return (
    <div className="max-w-container mx-auto px-6 py-10 md:px-12">
      <h1 className="mb-6 font-heading text-xl text-carbon">Nueva propiedad</h1>

      <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs text-gris">Título</label>
          <input
            name="titulo"
            required
            value={form.titulo}
            onChange={handleChange}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gris">Descripción</label>
          <textarea
            name="descricao"
            rows={4}
            value={form.descricao}
            onChange={handleChange}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gris">Tipo</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            >
              <option value="apartamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
              <option value="rural">Rural</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">Finalidad</label>
            <select
              name="finalidade"
              value={form.finalidade}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            >
              <option value="aluguel">Alquiler</option>
              <option value="venda">Venta</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-gris">Precio (USD)</label>
          <input
            name="preco"
            type="number"
            required
            value={form.preco}
            onChange={handleChange}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-gris">Dirección</label>
          <input
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gris">Barrio</label>
            <input
              name="bairro"
              required
              value={form.bairro}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">Ciudad</label>
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">Provincia</label>
            <input
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="mb-1 block text-xs text-gris">Ambientes</label>
            <input
              name="quartos"
              type="number"
              value={form.quartos}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">Baños</label>
            <input
              name="banheiros"
              type="number"
              value={form.banheiros}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">Cochera</label>
            <input
              name="vagas_garagem"
              type="number"
              value={form.vagas_garagem}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gris">m²</label>
            <input
              name="area_total"
              type="number"
              value={form.area_total}
              onChange={handleChange}
              className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-carbon">
          <input
            type="checkbox"
            name="destaque"
            checked={form.destaque}
            onChange={handleChange}
          />
          Mostrar en destacadas (home)
        </label>

        <div>
          <label className="mb-1 block text-xs text-gris">
            Fotos (podés seleccionar varias a la vez — la primera será la foto de portada)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFotos(e.target.files)}
            className="w-full rounded-md border border-dorado-light bg-white px-3 py-2 text-sm"
          />
        </div>

        {erro && (
          <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={salvando}
          className="rounded-md bg-dorado px-4 py-2.5 text-sm font-medium text-crema disabled:opacity-60"
        >
          {salvando ? 'Guardando...' : 'Guardar propiedad'}
        </button>
      </form>
    </div>
  )
}
