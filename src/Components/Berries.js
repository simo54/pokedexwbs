import React, { useEffect } from "react";
import Effect from "./EffectBerries"; // Effect on the View Stats Button
import Loading from "./LoadingPage"; // Gif showing up on loading page (current 5sec waiting)
import { Button } from "react-bootstrap"; // For more regarding importing style with react-bootstrap info https://react-bootstrap.netlify.app/getting-started/introduction/#importing-components
import "../Styles/Berries.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Berries() {
  const [berries, setBerries] = React.useState();

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
    }, 5000); // <--- Current Loading Time Wait
  }, []);

  // Search function, it will filter the results and display the match (or the close match)
  function search() {
    let i, txtValue, items;
    let input = document.getElementById("inputSearch");
    let filter = input.value.toUpperCase();
    let div = document.getElementsByClassName("cardToSearch");
    let h5 = document.getElementsByTagName("h5");
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < berries.length; i++) {
      items = h5[i];
      txtValue = items.textContent || items.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }

  return (
    <div className='container'>
      <div className='container mb-5 mt-5 d-flex justify-content-center'>
        {/* Search Input for filtering elements */}
        <div>
          <img src='https://cdn.icon-icons.com/icons2/851/PNG/512/Direction_icon-icons.com_67565.png' width='40' className='mr-2' />
        </div>
        <input type='text' onKeyUp={search} placeholder='Search here...' className='form-control w-25' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' id='inputSearch' />
      </div>

      <div className='container'>
        <div className='row row-cols-4 m-auto mb-2'>
          {/* ---> Conditional operator that will check if there are any results from the fetch*/}
          {berries && berries.length ? (
            berries.map((berry, index) => (
              <div key={index} className='col mb-4 cardToSearch'>
                <div className='card'>
                  <div className='card-body'>
                    <img src={berry.sprites.default} alt={berry} width='50' />
                    <h5 className='card-title'>{berry.name}</h5>
                    {/* Effect component, this provide the modal effect on clicking "View Stats", for the code => "./EffectBerries"  */}
                    <Effect titlePopUp={berry.name} category={berry.category.name} cost={berry.cost} effect={berry.effect_entries[0].short_effect} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loading /> // Loading component, follow "./LoadingPage" for the code
          )}
          {/* ---> End of conditional Operator */}
        </div>
      </div>
    </div>
  );
}
