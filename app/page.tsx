import Link from 'next/link'
import { getImoveisDestacados } from '@/lib/supabase/queries'
import ImovelCard from '@/components/imoveis/ImovelCard'

export const revalidate = 300 // ISR: revalida a cada 5 minutos

export default async function HomePage() {
  const { data: destacados, error } = await getImoveisDestacados()

  return (
    <div className="max-w-container mx-auto px-6 py-16 md:px-12">
      <section className="mb-16 text-center">
        <h1 className="mb-3 text-3xl font-medium text-carbon md:text-4xl">
          Encontrá el lugar ideal
          <br />
          en Buenos Aires
        </h1>
        <p className="mb-8 text-sm text-gris">
          Propiedades seleccionadas — venta y alquiler en CABA
        </p>

        <div className="mx-auto flex max-w-xl gap-2 rounded-xl border border-dorado-light bg-white p-1.5">
          <select className="flex-1 bg-transparent p-2 text-sm text-carbon">
            <option>Tipo de propiedad</option>
            <option value="apartamento">Departamento</option>
            <option value="casa">Casa</option>
          </select>
          <select className="flex-1 border-l border-dorado-light bg-transparent p-2 text-sm text-carbon">
            <option>Barrio</option>
          </select>
          <Link
            href="/imoveis"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-dorado px-5 py-2 text-sm text-crema"
          >
            Buscar
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-carbon">
          Destacadas
        </h2>
        {error ? (
          <p className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            Error al conectar con Supabase: {error}
          </p>
        ) : destacados.length === 0 ? (
          <p className="text-sm text-gris">
            Todavía no hay propiedades destacadas cargadas. Agregalas desde el Table
            Editor de Supabase (columna &quot;destaque&quot; = true).
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {destacados.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
