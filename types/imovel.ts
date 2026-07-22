export type Imovel = {
  id: string
  slug: string
  titulo: string
  descricao: string | null
  tipo: 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural'
  finalidade: 'venda' | 'aluguel'
  preco: number
  bairro: string
  cidade: string
  estado: string
  area_total: number | null
  quartos: number
  banheiros: number
  vagas_garagem: number
  status: 'disponivel' | 'reservado' | 'vendido' | 'alugado' | 'inativo'
  destaque: boolean
}

export type ImagemImovel = {
  id: string
  imovel_id: string
  url: string
  ordem: number
  capa: boolean
}
