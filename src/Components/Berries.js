import React, { useEffect } from "react";
import Effect from "./EffectBerries";
import Loading from "./LoadingPage";
import "../Styles/Berries.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Berries() {
  // Declare a State variable
  const [berries, setBerries] = React.useState();
  console.log(berries);

  // UseEffect to fetch all berries on page loaded, the results will update the state variable
  useEffect(() => {
    setTimeout(() => {
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
    }, 5000);
  }, []);

  return (
    <div className='container'>
      <div className='container mb-5'>
        <label>Search</label>
        <input type='text' placeholder='Write here...'></input>
      </div>
      {/* Conditional operator that will check if there are any results from fetch, if not will return null */}
      <div className='container'>
        <div className='row row-cols-4 m-auto mb-2'>
          {berries && berries.length ? (
            berries.map((berry, index) => (
              <div key={index} className='col mb-4'>
                <div className='card'>
                  <div className='card-body'>
                    <img src={berry.sprites.default} alt={berry} width='50' />
                    <h5 className='card-title'>{berry.name}</h5>
                    <>
                      <Effect titlePopUp={berry.name} category={berry.category.name} cost={berry.cost} />
                      {/* cost = {berry.cost }  effect={ berry.effect_entries[0].short_effect} */}
                    </>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>

      <footer className='container'></footer>
    </div>
  );
}
