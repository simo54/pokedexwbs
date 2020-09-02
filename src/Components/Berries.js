import React, { useEffect } from "react";
import axios from "axios";
import "../Styles/Berries.css";
// import bootstrap from "bootstrap";

export default function Berries() {
  // Declare a State variable
  const [dataBerries, setDataBerries] = React.useState({ name: "", url: "" });

  // UseEffect to fetch all berries on page loaded, the results will update the state variable
  useEffect(() => {
    console.log("INITIALIZE EFFECT");
    axios
      .get("https://pokeapi.co/api/v2/berry?offset=0&limit=64/")
      .then((response) => {
        setDataBerries(response.data.results);
        console.log("END EFFECT NO ERROR");
      })
      .catch(() => {
        console.log("There is an error ohoh");
      });
  }, []);

  return (
    <div>
      <header className='container'>PokeBerries</header>
      <label>Search</label>
      <input type='text' placeholder='Write here...'></input>

      {dataBerries.length
        ? dataBerries.map((element, index) => (
            <div key={index}>
              <h5>{element.name}</h5>
              <p>{element.url}</p>
            </div>
          ))
        : null}

      <footer className='container'>FOOTER</footer>
    </div>
  );
}
