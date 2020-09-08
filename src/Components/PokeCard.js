import React, {useState} from 'react';

function PokeCard ({name, img}) {

    return(
        <div className="card">
            <div className="card-body">
                <img src={img} alt={name} width="100" />
                <h5 className='card-title'>{name}</h5>
            </div>
        </div>
    )

}

export default PokeCard;