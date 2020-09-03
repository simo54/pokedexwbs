import React, { useEffect } from "react";
import axios from "axios";
import "../Styles/Berries.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className='container'>
      <div class='container mb-5'>
        <label>Search</label>
        <input type='text' placeholder='Write here...'></input>
      </div>
      {/* Conditional operator that will check if there are any results from fetch, if not will return null */}
      <div className='container'>
        <div className='row row-cols-4 m-auto mb-2'>
          {dataBerries.length
            ? dataBerries.map((element, index) => (
                <div className='col mb-4'>
                  <div class='card' key={index}>
                    <div class='card-body'>
                      <h5 class='card-title'>{element.name}</h5>
                      <p class='card-text'></p>
                      <a href='#' class='btn btn-primary'>
                        View Stats
                      </a>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <footer className='container '>FOOTER</footer>
    </div>
  );
}
