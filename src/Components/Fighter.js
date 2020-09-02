import React, { useState } from 'react';

function Fighter({ id, handleChange, poke }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const changePoke = () => {
    const input = document.querySelectorAll(".pokeNum")[id].value;
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

  return (
    <div className="App">
      <div className="trainer">
        <input className="pokeNum"></input>
        <button onClick={changePoke}>Let's go!</button>
        {loading ? 
        <p>loading...</p>  : error ? 
        <p>Error: {error}</p> : poke[id] ? 
        <div>
          <p>{poke[id].name}</p>
          <img src={poke[id].sprites.front_default}/>
          <p>HP: {poke[id].stats[0].base_stat}</p>
          <p>Attack value: {poke[id].stats[1].base_stat}</p>
          <p>Defense value: {poke[id].stats[2].base_stat}</p>
        </div> : 
        <p>Select a Pokemon!</p>}
      </div>
    </div>
  );
}

export default Fighter;
