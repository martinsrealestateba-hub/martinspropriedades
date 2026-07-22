import { getImoveis } from '@/lib/supabase/queries'
import ImovelCard from '@/components/imoveis/ImovelCard'

export const revalidate = 60

type SearchParams = {
  finalidade?: 'venda' | 'aluguel'
  tipo?: string
  bairro?: string
  precoMax?: string
}

export default async function ListagemPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const imoveis = await getImoveis({
    finalidade: searchParams.finalidade,
    tipo: searchParams.tipo,
    bairro: searchParams.bairro,
    precoMax: searchParams.precoMax ? Number(searchParams.precoMax) : undefined,
  })

  return (
    <div className="max-w-container mx-auto px-6 py-10 md:px-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-xl text-carbon">Propiedades</h1>
        <span className="text-xs text-gris">
          {imoveis.length} propiedad{imoveis.length !== 1 ? 'es' : ''} encontrada
          {imoveis.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filtros */}
        <aside className="w-full shrink-0 md:w-48">
          <form className="flex flex-col gap-5">
            <div>
              <label className="mb-1 block text-xs text-gris">Barrio</label>
              <input
                name="bairro"
                defaultValue={searchParams.bairro}
                placeholder="Todos"
                className="w-full rounded-md border border-dorado-light bg-white px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gris">Tipo</label>
              <select
                name="tipo"
                defaultValue={searchParams.tipo}
                className="w-full rounded-md border border-dorado-light bg-white px-2 py-1.5 text-sm"
              >
                <option value="">Todos</option>
                <option value="apartamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gris">Precio máx. USD</label>
              <input
                name="precoMax"
                type="number"
                defaultValue={searchParams.precoMax}
                placeholder="Sin límite"
                className="w-full rounded-md border border-dorado-light bg-white px-2 py-1.5 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-dorado px-3 py-2 text-xs font-medium text-crema"
            >
              Aplicar filtros
            </button>
          </form>
        </aside>

        {/* Resultados */}
        <div className="flex-1">
          {imoveis.length === 0 ? (
            <p className="text-sm text-gris">
              No se encontraron propiedades con estos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {imoveis.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
