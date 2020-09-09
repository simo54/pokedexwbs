import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

function EvolutionOne ({id,type}) {
    
    
    const [image, setImage] = useState({});
    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res=>res.json()).then((data) => {
            console.log(data)
            setImage({
                image:data.sprites.other.dream_world.front_default,
                name:data.name.toUpperCase(),
                id:id,
                evolution:data.evolves_from_species,
                type:data.types[0].type.name
            })
        })
    },[])
    
    return(
       
        <div id="evolution-box">
            
        <h1>{image.name}</h1> 
       <img src={image.image} alt="pokemon image" />
       <h1>{image.id}</h1>
       <h1>Type : <Button variant="success">{image.type}</Button></h1>
 
       </div>
    )
}

export default EvolutionOne;