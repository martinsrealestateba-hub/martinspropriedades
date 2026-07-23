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
      <div className="mb-8 flex aspect-video items-center justify-center rounded-xl bg-surface text-dorado/50">
        <span className="text-xs">Foto no disponible</span>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setFotoAberta(0)}
          className="aspect-[4/3] overflow-hidden rounded-xl bg-surface sm:col-span-2 sm:aspect-auto"
        >
          <img
            src={imagens[0].url}
            alt={titulo}
            className="h-full w-full object-cover transition hover:opacity-90"
          />
        </button>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          <button
            type="button"
            onClick={() => imagens[1] && setFotoAberta(1)}
            className="aspect-[4/3] overflow-hidden rounded-xl bg-surface sm:aspect-auto sm:h-1/2"
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
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface sm:aspect-auto sm:h-1/2"
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
        <div className="mt-2 grid grid-cols-4 gap-2 md:grid-cols-6">
          {imagens.slice(3).map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setFotoAberta(i + 3)}
              className="aspect-square overflow-hidden rounded-lg bg-surface"
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
    </div>
  )
}
