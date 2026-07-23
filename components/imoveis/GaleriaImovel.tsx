'use client'

import { useState } from 'react'
import type { ImagemImovel } from '@/types/imovel'

export default function GaleriaImovel({
  imagens,
  titulo,
}: {
  imagens: ImagemImovel[]
  titulo: string
}) {
  const [fotoAberta, setFotoAberta] = useState<number | null>(null)

  if (imagens.length === 0) {
    return (
      <div className="mb-6 flex h-56 items-center justify-center rounded-xl bg-surface text-dorado/50 md:h-72">
        <span className="text-xs">Foto no disponible</span>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 grid h-56 grid-cols-3 gap-2 md:h-72">
        <button
          type="button"
          onClick={() => setFotoAberta(0)}
          className="col-span-2 h-full overflow-hidden rounded-xl bg-surface"
        >
          <img
            src={imagens[0].url}
            alt={titulo}
            className="h-full w-full object-cover transition hover:opacity-90"
          />
        </button>
        <div className="flex h-full flex-col gap-2">
          <button
            type="button"
            onClick={() => imagens[1] && setFotoAberta(1)}
            className="h-1/2 overflow-hidden rounded-xl bg-surface"
          >
            {imagens[1] ? (
              <img
                src={imagens[1].url}
                alt={titulo}
                className="h-full w-full object-cover transition hover:opacity-90"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-dorado/50">
                Foto
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => imagens[2] && setFotoAberta(2)}
            className="relative h-1/2 overflow-hidden rounded-xl bg-surface"
          >
            {imagens[2] ? (
              <img
                src={imagens[2].url}
                alt={titulo}
                className="h-full w-full object-cover transition hover:opacity-90"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-dorado/50">
                Foto
              </span>
            )}
            {imagens.length > 3 && (
              <span className="absolute bottom-2 right-2 rounded bg-carbon px-2 py-0.5 text-[10px] text-crema">
                +{imagens.length - 3} fotos
              </span>
            )}
          </button>
        </div>
      </div>

      {imagens.length > 3 && (
        <div className="mb-6 grid grid-cols-4 gap-2 md:grid-cols-6">
          {imagens.slice(3).map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setFotoAberta(i + 3)}
              className="h-20 overflow-hidden rounded-lg bg-surface"
            >
              <img
                src={img.url}
                alt={titulo}
                className="h-full w-full object-cover transition hover:opacity-90"
              />
            </button>
          ))}
        </div>
      )}

      {fotoAberta !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/90 p-4"
          onClick={() => setFotoAberta(null)}
        >
          <button
            type="button"
            onClick={() => setFotoAberta(null)}
            className="absolute right-6 top-6 text-2xl text-crema"
            aria-label="Cerrar"
          >
            ✕
          </button>
          {fotoAberta > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFotoAberta((f) => (f !== null ? f - 1 : f))
              }}
              className="absolute left-4 text-3xl text-crema"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}
          <img
            src={imagens[fotoAberta].url}
            alt={titulo}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {fotoAberta < imagens.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFotoAberta((f) => (f !== null ? f + 1 : f))
              }}
              className="absolute right-4 text-3xl text-crema"
              aria-label="Siguiente"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
