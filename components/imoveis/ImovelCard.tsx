import Link from 'next/link'
import type { Imovel } from '@/types/imovel'

function formatarPreco(imovel: Imovel) {
  const valor = imovel.preco.toLocaleString('es-AR')
  return imovel.finalidade === 'aluguel' ? `USD ${valor}/mes` : `USD ${valor}`
}

export default function ImovelCard({ imovel }: { imovel: Imovel }) {
  return (
    <Link
      href={`/imoveis/${imovel.slug}`}
      className="block overflow-hidden rounded-xl border border-dorado-light bg-white transition hover:shadow-sm"
    >
      <div className="flex h-32 items-center justify-center bg-surface text-dorado/50">
        {/* Placeholder até a foto real da tabela imagens_imovel ser carregada */}
        <span className="text-xs">Foto</span>
      </div>
      <div className="p-4">
        <div className="text-base font-semibold text-dorado">{formatarPreco(imovel)}</div>
        <div className="mb-2 text-xs text-gris">
          {imovel.bairro}, {imovel.cidade}
        </div>
        <div className="flex gap-3 border-t border-surface pt-2 text-xs text-gris">
          <span>{imovel.quartos} amb.</span>
          <span>{imovel.banheiros} baños</span>
          {imovel.area_total && <span>{imovel.area_total}m²</span>}
        </div>
      </div>
    </Link>
  )
}
