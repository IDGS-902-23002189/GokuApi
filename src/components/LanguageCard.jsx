
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/LanguageCard.css";

function LanguageCard({ image, name, species, status, id }) {
  return (
    <li className="card">
      <Link
        to={`/personaje/${id}`}
        className="character-link"
      >
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

        <footer className="card__footer">
          Personaje de Rick and Morty
        </footer>
      </Link>
    </li>
  );
}

LanguageCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default LanguageCard;
