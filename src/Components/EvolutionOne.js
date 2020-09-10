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
    type = image.type;
    console.log(type)
    return(
       
        
            
        <div id="evolution-box" >
         
        <h3>{image.name}</h3> 
       
       <img src={image.image} alt="pokemon image"/>
      
      
       <h3 className="types">Type : <Button variant="success">{image.type}</Button></h3>
       
       </div>
       
    )
}

export default EvolutionOne;