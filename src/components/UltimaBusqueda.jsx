
import PropTypes from "prop-types";

function UltimaBusqueda({ onRecuperar, deshabilitado }) {
  return (
    <div className="last-search">
      <button
        type="button"
        className="filter-btn"
        onClick={onRecuperar}
        disabled={deshabilitado}
      >
        Última búsqueda
      </button>
    </div>
  );
}

UltimaBusqueda.propTypes = {
  onRecuperar: PropTypes.func.isRequired,
  deshabilitado: PropTypes.bool.isRequired,
};

export default UltimaBusqueda;
