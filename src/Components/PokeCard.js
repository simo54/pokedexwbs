import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokeCard ({name, img, id}) {
    return(
        <div className="card">
            <div className="card-body">
                <img src={img} alt={name} width="100" />
                <h5 className='card-title'>{name}</h5>
                <Link to={`/battle/${name}`}>
                    <button>Fight</button>
                </Link>
                <Link to={`/details/${id}`}>
                    <button>Details</button>
                </Link>
            </div>
        </div>
    )
}

export default PokeCard;