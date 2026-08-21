import { notFound } from 'next/navigation'
import { getImovelPorSlug, getImagensDoImovel } from '@/lib/supabase/queries'
import GaleriaImovel from '@/components/imoveis/GaleriaImovel'

export const revalidate = 60

const TIPO_LABEL: Record<string, string> = {
  casa: 'Casa',
  apartamento: 'Departamento',
  terreno: 'Terreno',
  comercial: 'Comercial',
  rural: 'Rural',
}

function formatarPreco(preco: number, finalidade: string) {
  const valor = preco.toLocaleString('es-AR')
  return finalidade === 'aluguel' ? `USD ${valor}/mes` : `USD ${valor}`
}

export default async function DetalheImovelPage({
  params,
}: {
  params: { slug: string }
}) {
  const imovel = await getImovelPorSlug(params.slug)

  if (!imovel) {
    notFound()
  }

  const imagens = await getImagensDoImovel(imovel.id)

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, me interesa la propiedad "${imovel.titulo}" (${TIPO_LABEL[imovel.tipo] ?? imovel.tipo}) que vi en el sitio.`
  )

  return (
    <div className="max-w-container mx-auto px-6 py-10 md:px-12">
      <GaleriaImovel imagens={imagens} titulo={imovel.titulo} />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <div className="mb-1 text-xs uppercase tracking-wide text-gris">
            {TIPO_LABEL[imovel.tipo] ?? imovel.tipo} · {imovel.finalidade === 'aluguel' ? 'Alquiler' : 'Venta'}
          </div>
          <h1 className="font-heading text-2xl text-carbon">{imovel.titulo}</h1>
          <p className="mb-4 text-sm text-gris">
            {imovel.bairro}, {imovel.cidade}
          </p>

          <div className="mb-6 flex gap-4 border-y border-dorado-light py-4 text-sm text-carbon">
            <span>{imovel.quartos} amb.</span>
            <span>{imovel.banheiros} baños</span>
            <span>{imovel.vagas_garagem} cocheras</span>
            {imovel.area_total && <span>{imovel.area_total} m²</span>}
          </div>

          {imovel.descricao && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-carbon">
              {imovel.descricao}
            </p>
          )}
        </div>

        <aside className="w-full shrink-0 rounded-xl border border-dorado-light p-5 md:w-72">
          <div className="mb-4 text-xl font-semibold text-dorado">
            {formatarPreco(imovel.preco, imovel.finalidade)}
          </div>
          <a
            href={`https://wa.me/5491122431538?text=${mensajeWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-md bg-dorado px-4 py-2 text-center text-xs font-medium text-crema"
          >
            Hablar por WhatsApp
          </a>
        </aside>
      </div>
    </div>
  )
}
