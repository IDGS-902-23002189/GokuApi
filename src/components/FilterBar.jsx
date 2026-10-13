import PropTypes from "prop-types";


function Filter({tipos,tipoActivo,onSeleccionar})
{

    return(
        <nav className=""></nav>

    );
}

//para definir los proptypes las estructura es:
// nombres del componente / funcion, .propTypes, el contenida
FilterBar.propTypes={
    tipos:PropTypes.arrayOf(PropTypes.string).isRequired,
    tipoActivo:PropTypes.string.isRequired,
    onSeleccionar:PropTypes.func.isRequired
};

export default FilterBar;