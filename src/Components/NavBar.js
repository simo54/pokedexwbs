import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Fight from "./Fight.js";
import Berries from "../Components/Berries/Berries";
import "./Styles/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <Router>
      <div className='container-fluid d-flex justify-content-center'>
        <h1 className='display-3 text-warning mt-3'>PokéWorld</h1>
      </div>
      <nav className='navbar-fluid navbar-expand-lg navbar-light mb-3 mt-4 pb-2'>
        {/* <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='true' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button> */}

        <div className='collapse navbar-collapse justify-content-around' id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            <Link to='/battle'>
              <li className='nav-item mr-5'>
                <a className='nav-link' href='#'>
                  <h4>Battle</h4>
                </a>
              </li>
            </Link>
            <Link to='/'>
              <li className='nav-item ml-5 mr-5'>
                <a className='nav-link' href='#'>
                  <h4>Pokédex</h4>
                </a>
              </li>
            </Link>
            <Link to='/berries'>
              <li className='nav-item ml-5'>
                <a className='nav-link' href='#'>
                  <h4>Berries</h4>
                </a>
              </li>
            </Link>
          </ul>
        </div>
        {/* <form className='form-inline my-1 my-lg-0 ' id='formSearch'>
          <input className='form-control mr-sm-1' type='search' placeholder='Search' aria-label='Search' />
          <button className='btn btn-outline-success my-1 my-sm-0' type='submit'>
            Search
          </button>
        </form> */}
      </nav>
      <Switch>
        <Route path='/' exact />
        <Route path='/berries' component={Berries} />
        <Route path='/battle' component={Fight} />
      </Switch>
    </Router>
  );
}