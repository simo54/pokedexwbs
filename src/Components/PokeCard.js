import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function PokeCard ({name, img}) {
    return(
        <div className="card">
            <div className="card-body">
                <img src={img} alt={name} width="100" />
                <h5 className='card-title'>{name}</h5>
                <Link to={`/battle/${name}`}>
                    <button>Fight</button>
                </Link>
                <Link to={`/details/${name}`}>
                    <button>Details</button>
                </Link>
            </div>
        </div>
    )
}

export default PokeCard;