import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PokeCard from "./PokeCard";
import Effectdex from "./EffectPokedex";
import "./Styles/Fight.css";

function Pokedex() {
  const [pokelist, setPokelist] = useState();
  const [error] = useState(false);
  const [pokeNum, setPokeNum] = useState(1);
  const [pokeSearch, setPokeSearch] = useState([]);
  const [toggle, setToggle] = useState(false);
  console.log(pokelist);

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
  };

  // This function will be executed when form is submitted
  function textSubmit(e) {
    e.preventDefault();
    const inputNumber = document.getElementById("inputSearch").value; // We get the value of the input
    let firstPromise = new Promise((resolve, reject) => {
      // We create a promise in order to be sure to get the data when we will pass the info to the Effected component
      fetch(`https://pokeapi.co/api/v2/pokemon/${inputNumber}`)
        .then((value) => value.json())
        .then((value) => resolve(value))
        .catch(() => reject());
    });
    firstPromise
      .then((pokejson) => {
        let name = pokejson.name; // get the data from here and then display
        let img = pokejson.sprites.front_default;
        let types = pokejson.types;
        let id = pokejson.id;
        setPokeSearch([{ name, img, types, id }]);
        setToggle(true);
      })
      .catch(() => console.log("there was a problem"));
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
  }, []);

  return (
    <div className='container'>
      {/* We hide the search bar during loading to prevent crashes in case the user immediately use the search bar */}
      {pokelist && pokelist.length ? (
        <form onSubmit={textSubmit}>
          {/* On submit the form will trigger a fetch of data (check above on textsubmit function) and after getting the result wanted (from 1 to 8**) the toggle will be triggered, if is true the modal will be activated and all data from fetch will go directly on the EffectPokedex component. When x is clicked, the toggle will be turned off */}
          {toggle === true ? <Effectdex name={pokeSearch[0].name} img={pokeSearch[0].img} number={pokeSearch[0].id} types={pokeSearch[0].types} toggler={() => setToggle(false)} /> : null}
          <div className='container mt-3 d-flex justify-content-center'>
            <img id='pikaHead' alt='pikachu' src='https://www.freepngimg.com/thumb/pokemon/37475-6-pikachu-transparent-image.png' width='50' height='50' />
          </div>
          <div className='container mb-5 mt-0 d-flex justify-content-center'>
            {/* Search Input for filtering elements */}
            <div>
              <img alt='compass' src='https://cdn.icon-icons.com/icons2/851/PNG/512/Direction_icon-icons.com_67565.png' width='40' className='mr-2' />
            </div>
            <input min='1' max='807' type='text' placeholder='Search here and press enter!' className='form-control w-25' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' id='inputSearch' />
            <img id='badge' alt='badge' src='https://image.flaticon.com/icons/svg/189/189011.svg' width='40' height='40' className='ml-2' />
          </div>
        </form>
      ) : null}
      {/* END of conditional operator */}
      <div className='row m-auto mb-2'>
        {error ? <div>Something went wrong!</div> : null}
        {pokelist
          ? pokelist.map((element, index) => (
              <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-4' key={index}>
                <PokeCard element={element} name={element.name} img={element.sprites.front_default} types={element.types} number={element.id} />
              </div>
            ))
          : null}
      </div>
      <Button className='mt-4 mb-4' onClick={loadMore}>
        Load more
      </Button>
    </div>
  );
}

export default Pokedex;
