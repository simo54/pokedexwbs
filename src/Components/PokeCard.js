import React, {useState} from 'react';

function PokeCard ({name, img}) {

    return(
        <div>
            <h1>{name}</h1>
            <img src={img} />
        </div>
    )

}

export default PokeCard;