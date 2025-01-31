export function Carta({ carta, seleccionada, onClick }) {
    return (
      <div
        className={`carta ${seleccionada ? 'seleccionada' : ''}`}
        onClick={onClick}
      >
        <div>
        <span>{carta?.valor} de {carta?.palo}</span>
        </div>
      </div>
    );
  }
