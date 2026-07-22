export default function Footer() {
  return (
    <footer className="border-t border-dorado-light/40 mt-20">
      <div className="max-w-container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-gris md:flex-row md:px-12">
        <span>&copy; {new Date().getFullYear()} Martins Propiedades — Buenos Aires</span>
        <a
          href="https://wa.me/5491100000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-dorado"
        >
          Hablar por WhatsApp
        </a>
      </div>
    </footer>
  )
}
