import React, { useState, useEffect } from "react";
import Fighter from "./Fighter";
import "./Styles/Fight.css";
import { useParams, useLocation } from "react-router-dom";

function Fight() {
  const [data, setData] = useState([]);
  const [hp, setHp] = useState([100, 100]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let path = useParams();

  useEffect(() =>{
    let start = path.pokeName;
    changePokemon(0, start);
    },[]);


  const fight = () => {
    // Naming for Readability
    const pokeOne = data[0].name_upper;
    const pokeTwo = data[1].name_upper;
    let hpOne = data[0].stats[0].base_stat;
    let hpTwo = data[1].stats[0].base_stat;
    const attOne = data[0].stats[1].base_stat;
    const attTwo = data[1].stats[1].base_stat;
    const defOne = data[0].stats[2].base_stat;
    const defTwo = data[1].stats[2].base_stat;
    const battleLog = document.querySelector(".battleLog");
    battleLog.innerHTML = "";
    setHp([100, 100]);

    const battleLoop = () => {
      battleLog.innerHTML = "";
      if (hpOne <= 0) {
        if (hpTwo <= 0) {
          battleLog.innerHTML += `<p>What a disaster! Both pokemon faint!</p>`;
        } else {
          battleLog.innerHTML += `<p>${pokeOne} faints</p>`;
        }
      } else if (hpTwo <= 0) {
        battleLog.innerHTML += `<p>${pokeTwo} faints</p>`;
      } else {
        // Highest Defense Value is 230
        // assign a random value to multiply with for every pokemon "chance"
        let randomOne = Math.random();
        let randomTwo = Math.random();
        battleLog.innerHTML += `<p>Round starts:</p>`;
        battleLog.innerHTML += `<p>${pokeOne} attacks for ${attOne}</p>`;
        hpTwo = hpTwo - Math.floor(attOne * randomOne * (1 - defTwo / 300)) < 0 ? 0 : hpTwo - Math.floor(attOne * randomOne * (1 - defTwo / 300));
        battleLog.innerHTML += `<p>${pokeTwo} defends with a value of ${defTwo} and takes ${Math.floor(attOne * randomOne * (1 - defTwo / 300))} damage.</p>`;
        battleLog.innerHTML += `<p>${pokeTwo} attacks for ${attTwo}</p>`;
        hpOne = hpOne - Math.floor(attTwo * randomTwo * (1 - defOne / 300)) < 0 ? 0 : hpOne - Math.floor(attTwo * randomTwo * (1 - defOne / 300));
        battleLog.innerHTML += `<p>${pokeOne} defends with a value of ${defOne} and takes ${Math.floor(attTwo * randomTwo * (1 - defOne / 300))} damage.</p>`;
        // Divide remaining HP by Original HP then multiply by 100 to get %
        setHp([(hpOne / data[0].stats[0].base_stat) * 100, (hpTwo / data[1].stats[0].base_stat) * 100]);
        setTimeout(battleLoop, 3000);
      }
    };
    battleLoop();
  };

  const changeFighters = (value, num) => {
    setHp([100, 100]);
    document.querySelector(".battleLog").innerHTML = "";
    const copy = [...data];
    copy[num] = value;
    copy[num].name_upper = copy[num].name[0].toUpperCase() + copy[num].name.substring(1);
    setData(copy);
  };

  const changePokemon = (id, input) => {
    setError(false);
    if (input === "") {
      setError("No input");
    } else if (input > 807) {
      setError("Too high. Max: 807");
    } else if (input < 0) {
      setError("Too low. Min: 1");
    } else {
      setLoading(true);
      fetch(`http://pokeapi.co/api/v2/pokemon/${input}`)
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          changeFighters(info, id);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
      document.querySelectorAll(".pokeNum")[id].value = "";
    }
  };

  return (
    <div className='App'>
      <div className='container' style={{ border: "none" }}>
        <div className='row'>
          <div className='col-lg'>
            <Fighter id={0} fightHp={hp} handleChange={() => changePokemon(0, document.querySelectorAll(".pokeNum")[0].value)} poke={data} />
          </div>
          <div className='col-lg'>
            <Fighter id={1} fightHp={hp} handleChange={() => changePokemon(1, document.querySelectorAll(".pokeNum")[1].value)} poke={data}  />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {data.length > 1 ? (
              <button onClick={fight} className='btn btn-dark btn-block' id='btn_fight'>
                Fight!
              </button>
            ) : null}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='battleLog' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fight;
