import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Fight from "./Fight.js";
import Pokedex from "./Pokedex.js";
import Berries from "../Components/Berries/Berries";
import "./Styles/App.css";

function App() {
  return (
    <div className='App'>
      <Pokedex />
    </div>
  );
}

export default App;
