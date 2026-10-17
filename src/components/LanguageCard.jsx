
import PropTypes from "prop-types";
import "../styles/LanguageCard.css";

function LanguageCard({ image, name, species, status }) {
  return (
    <li className="card">
      <div className="card__header">
        <img
          className="card__image"
          src={image}
          alt={`Imagen de ${name}`}
          loading="lazy"
        />

        <h2 className="card__title">{name}</h2>
      </div>

      <span className="card__badge">
        Estado: {status}
      </span>

      <p className="card__description">
        Especie: {species}
      </p>

      <>
        <footer className="card__footer">
          Personaje de Rick and Morty
        </footer>
      </>
    </li>
  );
}

LanguageCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default LanguageCard;
