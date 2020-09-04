import React, { useEffect } from "react";
import "../Styles/Berries.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Effect from "./EffectBerries";
import { Button } from "react-bootstrap";

export default function Berries() {
  // Declare a State variable
  const [berries, setBerries] = React.useState();

  // UseEffect to fetch all berries on page loaded, the results will update the state variable
  useEffect(() => {
    const pendingPromises = [];
    for (let i = 1; i <= 64; i++) {
      pendingPromises.push(
        fetch("https://pokeapi.co/api/v2/berry/" + i)
          .then((value) => value.json())
          .then((value) => value)
          .catch((e) => e)
      );
    }
    Promise.all(pendingPromises).then((value) => {
      const pendingPromises2 = value.map((element) => {
        return fetch(element.item.url)
          .then((value) => value.json())
          .then((value) => value)
          .catch((e) => e);
      });
      Promise.all(pendingPromises2).then((value) => setBerries(value));
    });
  }, []);

  return (
    <div className='container'>
      <div class='container mb-5'>
        <label>Search</label>
        <input type='text' placeholder='Write here...'></input>
      </div>
      {/* Conditional operator that will check if there are any results from fetch, if not will return null */}
      <div className='container'>
        <div className='row row-cols-4 m-auto mb-2'>
          {berries && berries.length
            ? berries.map((berry) => (
                <div className='col mb-4'>
                  <div class='card'>
                    <div class='card-body'>
                      <img img src={berry.sprites.default} alt={berry} width='50' />
                      <h5 class='card-title'>{berry.name}</h5>
                      <>
                        <Effect />
                      </>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <footer className='container '>Footer</footer>
    </div>
  );
}
