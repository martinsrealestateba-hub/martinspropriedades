import { supabase } from './client'
import type { Imovel } from '@/types/imovel'

export async function getImoveisDestacados(): Promise<{
  data: Imovel[]
  error: string | null
}> {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*, imagens_imovel(id, url, ordem, capa)')
    .eq('destaque', true)
    .neq('status', 'inativo')
    .limit(6)

  if (error) {
    console.error('Error al buscar propiedades destacadas:', error.message)
    return { data: [], error: error.message }
  }
  return { data: data ?? [], error: null }
}

export type FiltrosImovel = {
  finalidade?: 'venda' | 'aluguel'
  tipo?: string
  bairro?: string
  precoMax?: number
  quartosMin?: number
}

export async function getImoveis(filtros: FiltrosImovel = {}): Promise<Imovel[]> {
  let query = supabase
    .from('imoveis')
    .select('*, imagens_imovel(id, url, ordem, capa)')
    .neq('status', 'inativo')

  if (filtros.finalidade) query = query.eq('finalidade', filtros.finalidade)
  if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
  if (filtros.bairro) query = query.eq('bairro', filtros.bairro)
  if (filtros.precoMax) query = query.lte('preco', filtros.precoMax)
  if (filtros.quartosMin) query = query.gte('quartos', filtros.quartosMin)

  const { data, error } = await query.order('criado_em', { ascending: false })

  if (error) {
    console.error('Error al buscar propiedades:', error.message)
    return []
  }
  return data ?? []
}

export async function getImovelPorSlug(slug: string): Promise<Imovel | null> {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error al buscar la propiedad:', error.message)
    return null
  }
  return data
}

export async function getImagensDoImovel(imovelId: string) {
  const { data, error } = await supabase
    .from('imagens_imovel')
    .select('*')
    .eq('imovel_id', imovelId)
    .order('ordem', { ascending: true })

  if (error) {
    console.error('Error al buscar imágenes:', error.message)
    return []
  }
  return data ?? []
}

export async function criarLead(lead: {
  imovel_id?: string
  nome: string
  telefone: string
  email?: string
  mensagem?: string
}) {
  const { error } = await supabase.from('leads').insert(lead)
  if (error) {
    console.error('Error al enviar el formulario:', error.message)
    return false
  }
  return true
}
