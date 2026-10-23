
import PropTypes from "prop-types";
import "../styles/BarraBusqueda.css";

function BarraBusqueda({ textoBusqueda, onCambiar, onBuscar }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar personaje por nombre..."
        value={textoBusqueda}
        onChange={(e) => onCambiar(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onBuscar();
          }
        }}
        aria-label="Buscar personajes por nombre"
      />

      <button
        type="button"
        className="search-btn"
        onClick={onBuscar}
      >
        Buscar
      </button>
    </div>
  );
}

BarraBusqueda.propTypes = {
  textoBusqueda: PropTypes.string.isRequired,
  onCambiar: PropTypes.func.isRequired,
  onBuscar: PropTypes.func.isRequired,
};

export default BarraBusqueda;
