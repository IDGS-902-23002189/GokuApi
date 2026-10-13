
import PropTypes from "prop-types";
import "../styles/CharacterList.css";

function CharacterList({ characters }) {
  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li className="character-list__item" key={character.id}>
          <img
            className="character-list__image"
            src={character.image}
            alt={character.name}
          />

          <div className="character-list__info">
            <h2>{character.name}</h2>

            <p>
              <strong>Raza:</strong> {character.race}
            </p>

            <p>
              <strong>Género:</strong> {character.gender}
            </p>

            <p>
              <strong>Ki:</strong> {character.ki}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      race: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      ki: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CharacterList;
