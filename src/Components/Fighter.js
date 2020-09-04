import React, { useState } from 'react';
import '../Styles/Fighter.css'

function Fighter({ id, handleChange, poke, hp }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const changePoke = () => {
    setError(false);
    const input = document.querySelectorAll(".pokeNum")[id].value;
    if (input === "") {
      setError("No input");
    } else if (input > 807) {
      setError("Too high. Max: 807")
    } else if (input < 0) {
      setError("Too low. Min: 1")
    } else {
    setLoading(true);
    fetch(`http://pokeapi.co/api/v2/pokemon/${input}`)
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      handleChange(info);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
    })
    document.querySelectorAll(".pokeNum")[id].value = "";
    }
  }

  return (
    <div className="App">
      <div className="card">
      {loading ? 
        <p>loading...</p>  : error ? 
        <p>Error: {error}</p> : poke[id] ? 
        <div>
          <div style={{height: "150px"}}>
            <img src={`https://play.pokemonshowdown.com/sprites/ani/${poke[id].name}.gif`} />
          </div>
          <h5 className="card-title">{poke[id].name_upper}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">HP: {poke[id].stats[0].base_stat}</li>
            <li className="list-group-item">Attack value: {poke[id].stats[1].base_stat}</li>
            <li className="list-group-item">Defense value: {poke[id].stats[2].base_stat}</li>
          </ul>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{width: `${hp[id]}%`}}></div>
          </div>
        </div> : 
        <p>Select a Pokemon!</p>}
        <input className="pokeNum"></input>
        <button onClick={changePoke} className="btn btn-info">Select Pokemon</button>

      </div>
    </div>
  );
}

export default Fighter;
