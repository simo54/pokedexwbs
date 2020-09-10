import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Styles/Pokedex.css";

function PokeCard({ name, img, types, number, element }) {
  return (
    <div className='card'>
      <div className='card-body'>
        <img src={img} alt={name} width='100' />
        <h5 className='card-title' className='toUpper'>
          #{number}
          {""} {""}
          {name}
        </h5>
        <p className='toUpper'>{types[0].type.name}</p>
        {types[1] ? <p className='toUpper'>{types[1].type.name}</p> : null}
        <Link to={{ pathname: `/battle/${number}`, state: { element } }}>
          <Button className='mr-2'>Fight</Button>
        </Link>
        <Link to={`/details/${number}`}>
          <Button className='ml-2'>Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default PokeCard;
