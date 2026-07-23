import { notFound } from 'next/navigation'
import { getImovelPorSlug, getImagensDoImovel } from '@/lib/supabase/queries'
import GaleriaImovel from '@/components/imoveis/GaleriaImovel'

export const revalidate = 300

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
  const numeroWhatsapp = '5491100000000'
  const mensagem = encodeURIComponent(
    `Hola! Me interesa la propiedad "${imovel.titulo}" (${imovel.bairro}).`
  )

  return (
    <div className="max-w-container mx-auto px-6 py-10 md:px-12">
      <p className="mb-4 text-xs text-gris">
        {imovel.finalidade === 'venda' ? 'Comprar' : 'Alquilar'} / {imovel.bairro} /{' '}
        <span className="text-carbon">{imovel.titulo}</span>
      </p>

      <GaleriaImovel imagens={imagens} titulo={imovel.titulo} />

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold text-carbon md:text-2xl">
            {imovel.titulo}
          </h1>
          <p className="text-sm text-gris">
            {imovel.bairro}, {imovel.cidade}
          </p>
        </div>
        <div className="whitespace-nowrap text-2xl font-semibold text-dorado">
          {formatarPreco(imovel.preco, imovel.finalidade)}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 divide-x divide-dorado-light border-y border-dorado-light py-4 text-center">
        <div>
          <div className="text-base font-semibold text-carbon">{imovel.quartos}</div>
          <div className="text-[10px] text-gris">Ambientes</div>
        </div>
        <div>
          <div className="text-base font-semibold text-carbon">{imovel.banheiros}</div>
          <div className="text-[10px] text-gris">Baños</div>
        </div>
        <div>
          <div className="text-base font-semibold text-carbon">{imovel.vagas_garagem}</div>
          <div className="text-[10px] text-gris">Cochera</div>
        </div>
        <div>
          <div className="text-base font-semibold text-carbon">
            {imovel.area_total ?? '—'}m²
          </div>
          <div className="text-[10px] text-gris">Superficie</div>
        </div>
      </div>

      {imovel.descricao && (
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-semibold text-carbon">Descripción</h2>
          <p className="text-sm leading-relaxed text-gris">{imovel.descricao}</p>
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl border border-dorado-light bg-white p-4">
        <div>
          <div className="text-xs text-gris">¿Te interesa esta propiedad?</div>
          <div className="text-sm font-medium text-carbon">
            Escribinos y te respondemos al toque
          </div>
        </div>
        
          href={`https://wa.me/${numeroWhatsapp}?text=${mensagem}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-dorado px-5 py-2.5 text-sm text-crema"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}
