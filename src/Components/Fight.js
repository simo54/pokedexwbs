import React, { useState } from 'react';
import '../Styles/Fight.css';
import Fighter from './Fighter';

function Fight() {
  const [data, setData] = useState([]);

  const fight = () => {
    // Naming for Readability
    const pokeOne = data[0].name;
    const pokeTwo = data[1].name;
    let hpOne = data[0].stats[0].base_stat;
    let hpTwo = data[1].stats[0].base_stat;
    const attOne = data[0].stats[1].base_stat;
    const attTwo = data[1].stats[1].base_stat;
    const defOne = data[0].stats[2].base_stat;
    const defTwo = data[1].stats[2].base_stat;
    const battleLog = document.querySelector(".battleLog");

    while (true) {
      if (hpOne <= 0) {
        if (hpTwo <= 0) {
            battleLog.innerHTML += `<p>What a disaster! Both pokemon faint!</p>`
            break;
        } else {
            battleLog.innerHTML += `<p>${pokeOne} faints</p>`
            break;
        }
    } else if (hpTwo <= 0) {
        battleLog.innerHTML += `<p>${pokeTwo} faints</p>`
        break;
    } else {
        battleLog.innerHTML += `<p>Round starts:</p>`
        battleLog.innerHTML += `<p>${pokeOne} attacks for ${attOne}</p>`
        hpTwo -= Math.floor(attOne * (1 - defTwo / 100))
        battleLog.innerHTML += `<p>${pokeTwo} defends with a value of ${defTwo} and takes ${Math.floor(attOne * (1 - defTwo / 100))} damage.</p>`
        battleLog.innerHTML += `<p>${pokeTwo} attacks for ${attTwo}</p>`
        hpOne -= Math.floor(attTwo * (1 - defOne / 100));
        battleLog.innerHTML += `<p>${pokeOne} defends with a value of ${defOne} and takes ${Math.floor(attTwo * (1 - defOne / 100))} damage.</p>`
        battleLog.innerHTML += `<p>remaining HP: ${pokeOne}: ${hpOne} - ${pokeTwo}: ${hpTwo}</p>`
    }
  }

  }

  const changePokemon = (value, num) => {
    const copy = [...data];
    copy[num] = value;
    copy[num].name = copy[num].name[0].toUpperCase() + copy[num].name.substring(1);
    setData(copy);
  }

  return (
    <div className="App">
      <Fighter id={0} handleChange={(value) => changePokemon(value, 0)} poke={data} />
      <Fighter id={1} handleChange={(value) => changePokemon(value, 1)} poke={data}/>
      <button onClick={fight}>Fight!</button>
      <div className="battleLog"></div>
   </div>
  );
}

export default Fight;
