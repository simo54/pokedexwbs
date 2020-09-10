import React, { useState } from "react";
import "./Styles/Fighter.css";

function Fighter({ id, handleChange, poke, fightHp }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <div className="card">
      {loading ? 
        <p>loading...</p>  : error ? 
        <p>Error: {error}</p> : poke[id] ? (
        <div>
          <div style={{height: "150px"}}>
            <img className="fighterImg" src={`https://play.pokemonshowdown.com/sprites/ani/${poke[id].name}.gif`} />
          </div>
          <h5 className="card-title">{poke[id].name_upper}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">HP: {Math.floor(poke[id].stats[0].base_stat / 100 * fightHp[id]) > 0 ? Math.floor(poke[id].stats[0].base_stat / 100 * fightHp[id]) : 0}</li>
            <li className="list-group-item">Attack value: {poke[id].stats[1].base_stat}</li>
            <li className="list-group-item">Defense value: {poke[id].stats[2].base_stat}</li>
          </ul>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{width: `${fightHp[id]}%`}}></div>
          </div>
        </div>
        ) : (
          <p>Select a Pokemon!</p>
        )}
        <input className='pokeNum'></input>
        <button onClick={handleChange} className='btn btn-info'>
          Select Pokemon
        </button>
      </div>
    </div>
  );
}

export default Fighter;
