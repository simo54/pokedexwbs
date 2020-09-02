import React, { useState } from 'react';
import '../Styles/Fight.css';
import Fighter from './Fighter';

function Fight() {
  const [data, setData] = useState([]);

  const fight = () => {
    // Naming for Readability
    const pokeOne = data[0].name;
    const pokeTwo = data[1].name
    let hpOne = data[0].stats[0].base_stat;
    let hpTwo = data[1].stats[0].base_stat;
    const attOne = data[0].stats[1].base_stat;
    const attTwo = data[1].stats[1].base_stat;
    const defOne = data[0].stats[2].base_stat;
    const defTwo = data[1].stats[2].base_stat;

    while (true) {
      if (hpOne <= 0) {
      if (hpTwo <= 0) {
        console.log("What a disaster! Both pokemon faint!");
        break;
      } else {
      console.log(`${pokeOne} faints`);
      break;
      }
    } else if (hpTwo <= 0) {
      console.log(`${pokeTwo} faints`);
      break;
    } else {
      console.log("Round starts:");
      console.log(`${pokeOne} attacks for ${attOne}`);
      hpTwo -= Math.floor(attOne * (1 - defTwo / 100))
      console.log(`${pokeTwo} defends with a value of ${defTwo} and takes ${Math.floor(attOne * (1 - defTwo / 100))} damage.`)
      console.log(`${pokeTwo} attacks for ${attTwo}`);
      hpOne -= Math.floor(attTwo * (1 - defOne / 100));
      console.log(`${pokeOne} defends with a value of ${defOne} and takes ${Math.floor(attTwo * (1 - defOne / 100))} damage.`);
      console.log(`remaining HP: ${pokeOne}: ${hpOne} - ${pokeTwo}: ${hpTwo}`)
    }
  }

  }

  const changePokemon = (value, num) => {
    const copy = [...data];
    copy[num] = value;
    setData(copy);
  }

  return (
    <div className="App">
      <Fighter id={0} handleChange={(value) => changePokemon(value, 0)} poke={data} />
      <Fighter id={1} handleChange={(value) => changePokemon(value, 1)} poke={data}/>
      <button onClick={fight}>Fight!</button>
   </div>
  );
}

export default Fight;
