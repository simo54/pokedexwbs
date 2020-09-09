import React, { useState, useEffect } from 'react';
import PokeCard from './PokeCard';
import './Styles/Fight.css'


function Pokedex() {
    const [pokelist, setPokelist] = useState();
    const [fetchUrl, setFetchUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const [error, setError] = useState(false);
    const [pokeNum, setPokeNum] = useState(1);

    const loadMore = () => {
        const pendingPromises = [];
        for (let i = 1; i <= pokeNum + 19; i++) {
            pendingPromises.push(
            fetch(`http://pokeapi.co/api/v2/pokemon/${i}`)
                .then((data) => data.json())
                .then((data) => data)
                .catch((e) => e)
                );
        }
        Promise.all(pendingPromises).then((value) => {
            setPokelist(value);
            });

        setPokeNum(pokeNum + 20);
        console.log(pokeNum);
    }

    useEffect(() => {
        const pendingPromises = [];
        for (let i = pokeNum; i <= pokeNum + 19; i++) {
            pendingPromises.push(
            fetch(`http://pokeapi.co/api/v2/pokemon/${i}`)
                .then((data) => data.json())
                .then((data) => data)
                .catch((e) => e)
                );
        }
        Promise.all(pendingPromises).then((value) => {
            setPokelist(value);
            });

        setPokeNum(pokeNum + 20);
        console.log(pokeNum);
    }, []);

    return (
        <div className="container">
            <div className='row row-cols-4 m-auto mb-2'>
                {error ? (
                    <div>
                        Something went wrong!
                    </div>
                ) : null}
                {pokelist  ?
                    (pokelist.map((element, index) => (
                        <div className="col mb-4"key={index}>
                            <PokeCard name={element.name} img={element.sprites.front_default} types={element.types} number={element.id}/>                        
                        </div>
                    )))
                : null}
            </div>
            <button onClick={loadMore}>Load more</button>
        </div>
    )
}

export default Pokedex;