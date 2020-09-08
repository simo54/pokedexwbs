import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

function PokeCard ({name, img}) {
    const [redirect, setRedirect] = useState();

    if (redirect) {
        return <Redirect to={{pathname: redirect }} />
    }

    return(
        <div className="card">
            <div className="card-body">
                <img src={img} alt={name} width="100" />
                <h5 className='card-title'>{name}</h5>
                <button onClick={() => {setRedirect("/battle")}}>Fight</button>
                <button>Details</button>
            </div>
        </div>
    )

}

export default PokeCard;