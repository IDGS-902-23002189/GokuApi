
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

const ESPECIES = [
  "Human",
  "Alien",
  "Humanoid",
  "Animal",
  "Robot",
  "Mythological Creature",
  "Poopybutthole",
  "Cronenberg",
  "Disease",
  "Unknown",
];

function FilterBar({ especieActiva, onSeleccionar }) {
  return (
    <nav
      className="filter-bar"
      aria-label="Filtrar por especie"
    >
      <button
        type="button"
        className={`filter-btn ${
          especieActiva === "Todos" ? "active" : ""
        }`}
        onClick={() => onSeleccionar("Todos")}
      >
        Todos
      </button>

      {ESPECIES.map((especie) => (
        <button
          key={especie}
          type="button"
          className={`filter-btn ${
            especieActiva === especie ? "active" : ""
          }`}
          onClick={() => onSeleccionar(especie)}
        >
          {especie}
        </button>
      ))}
    </nav>
  );
}

FilterBar.propTypes = {
  especieActiva: PropTypes.string.isRequired,
  onSeleccionar: PropTypes.func.isRequired,
};

export default FilterBar;
