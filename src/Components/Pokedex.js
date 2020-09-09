import React, { useState, useEffect } from 'react';
import PokeCard from './PokeCard';
import './Styles/Fight.css'


function Pokedex() {
    const [pokelist, setPokelist] = useState();
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
    }

    const search= () => {}

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
    }, []);

    return (
        <div className="container">
            {/* We hide the search bar during loading to prevent crashes in case the user immediately use the search bar */}
            {pokelist && pokelist.length ? (
        <>
          <div className='container mt-3 d-flex justify-content-center'>
            <img id='pikaHead' alt='pikachu' src='https://www.freepngimg.com/thumb/pokemon/37475-6-pikachu-transparent-image.png' width='50' height='50' />
          </div>
          <div className='container mb-5 mt-0 d-flex justify-content-center'>
            {/* Search Input for filtering elements */}
            <div>
              <img alt='compass' src='https://cdn.icon-icons.com/icons2/851/PNG/512/Direction_icon-icons.com_67565.png' width='40' className='mr-2' />
            </div>
            <input type='text' onKeyUp={search} placeholder='Search here...' className='form-control w-25' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' id='inputSearch' />
            <img id='badge' alt='badge' src='https://image.flaticon.com/icons/svg/189/189011.svg' width='40' height='40' className='ml-2' />
          </div>
        </>
      ) : null}
      {/* END of conditional operator */}
            <div className='row row-cols-4 m-auto mb-2'>
                {error ? (
                    <div>
                        Something went wrong!
                    </div>
                ) : null}
                {pokelist  ?
                    (pokelist.map((element, index) => (
                        <div className="col mb-4"key={index}>
                            <PokeCard element={element} name={element.name} img={element.sprites.front_default} types={element.types} number={element.id}/>                        
                        </div>
                    )))
                : null}
            </div>
            <button onClick={loadMore}>Load more</button>
        </div>
    )
}

export default Pokedex;