import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Header() {
  return (
    <header className="border-b border-dorado-light/40">
      <div className="max-w-container mx-auto flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden gap-8 text-sm text-carbon md:flex">
          <Link href="/imoveis?finalidade=venda">Comprar</Link>
          <Link href="/imoveis?finalidade=aluguel">Alquilar</Link>
          <Link href="/sobre">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  )
}
