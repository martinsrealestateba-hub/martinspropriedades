import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Martins Propiedades | Venta y alquiler en Buenos Aires',
  description:
    'Propiedades seleccionadas en Buenos Aires. Venta y alquiler en Palermo, Recoleta, Belgrano y más barrios de CABA.',
  openGraph: {
    title: 'Martins Propiedades',
    description: 'Propiedades seleccionadas — venta y alquiler en CABA',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-AR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
