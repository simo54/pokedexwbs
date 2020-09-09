import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function PokeCard ({name, img, types, number, element}) {

    return(
        <div className="card">
            <div className="card-body">
                <img src={img} alt={name} width="100" />
                <h5 className='card-title'>{number} {name}</h5>
                <p>{types[0].type.name}</p>
                {types[1] ? 
                <p>{types[1].type.name}</p> :
                null }
                <Link to={{ pathname: `/battle/${number}`, state: {element}}}>
                    <button>Fight</button>
                </Link>
                <Link to={`/details/${number}`}>
                    <button>Details</button>
                </Link>
            </div>
        </div>
    )

}

export default PokeCard;