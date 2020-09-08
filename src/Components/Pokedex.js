import React, { useState, useEffect } from 'react';
import PokeCard from './PokeCard';
import './Styles/Fight.css'


function Pokedex() {
    const [pokelist, setPokelist] = useState();
    const [fetchUrl, setFetchUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            setError(false);
            setFetchUrl(data.next);
            data.results.map((element) => {
                let url = element.url.slice(-1) === "/" ?
                element.url.substring(0, element.url.length -1)
                : element.url;
                url = url.substring(url.lastIndexOf("/") + 1);
                element.imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`;
                return element;
            })
            setPokelist(data);
        })
        .catch((err) => {
            setError(true);
        });
    }, []);


    return (
        <div className="container">
            <div className='row row-cols-4 m-auto mb-2'>
                {error ? (
                    <div>
                        Something went wrong!
                    </div>
                ) : null}
                {pokelist && pokelist.results.length ?
                    (pokelist.results.map((element, index) => (
                        <div className="col mb-4"key={index}>
                            <PokeCard name={element.name} img={element.imgSrc}/>                        
                        </div>
                    )))
                : null}
            </div>
        </div>
    )
}

export default Pokedex;