export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#FDFCFA" stroke="#B08D5B" strokeWidth="2" />
        <g stroke="#B08D5B" strokeWidth="2.2" fill="none" strokeLinecap="square">
          <line x1="12" y1="40" x2="12" y2="30" />
          <line x1="12" y1="30" x2="18" y2="30" />
          <line x1="18" y1="30" x2="18" y2="40" />
          <line x1="22" y1="40" x2="22" y2="34" />
          <line x1="22" y1="34" x2="26" y2="34" />
          <line x1="26" y1="34" x2="26" y2="40" />
          <path d="M28 40 L28 27 A3 3 0 0 1 34 27 L34 40" />
          <line x1="38" y1="40" x2="38" y2="20" />
          <path d="M35.5 20 L40.5 20 L38 16 Z" fill="#B08D5B" stroke="none" />
          <line x1="42" y1="40" x2="42" y2="31" />
          <line x1="42" y1="31" x2="46" y2="31" />
          <line x1="46" y1="31" x2="46" y2="40" />
          <path d="M48 40 L48 33 A3 3 0 0 1 54 33 L54 40" />
          <path d="M12 40 L54 40" strokeWidth="2" />
        </g>
      </svg>
      <div className="font-heading text-lg font-semibold text-carbon">
        Martins{' '}
        <span className="font-sans text-xs font-normal tracking-wider text-dorado">
          PROPIEDADES
        </span>
      </div>
    </div>
  )
}
