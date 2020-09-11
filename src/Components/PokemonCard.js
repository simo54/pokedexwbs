import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./Styles/PokemonImage.css";
import EvolutionOne from "./EvolutionOne";
import pokeball from "../img/pokeball.png";

function PokemonCard(props) {
  const routerID = props.match.params.id;
  const type = props.match.params.type;
  const [pokemon, setPokemon] = useState({});
  const [currentId, setCurrentId] = useState(routerID);
  const [isLoading, setIsLoading] = useState(
    setTimeout(() => {
      setIsLoading(false);
    }, 450)
  );
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + currentId)
      .then((pokeRes) => pokeRes.json())
      .then((data) => {
        fetch(data.species.url)
          .then((speciesRes) => speciesRes.json())
          .then((speciesData) => {
            console.log(speciesData);
            const newPokemonFormat = {
              ...data,
              name: data.name.toUpperCase(),
              order: data.order,
              weight: data.weight,
              image: data.sprites.other.dream_world.front_default,
              hp: data.base_experience,
              ability: data.abilities[0].ability.name.toUpperCase(),
              id: data.id,
              stats: data.stats[1].base_stat,
              attack: data.stats[1].name,
              abilityTwo: data.abilities[0].ability.name,
              move: data.moves[3].move.name,
              height: data.height,
              base_happiness: speciesData.base_happiness,
              capture_rate: speciesData.capture_rate,
              form: speciesData.flavor_text_entries[10].flavor_text,
              growth_rate: speciesData.growth_rate.name,
              habitat: speciesData.habitat.name,
              color: speciesData.color.name,
              genus: speciesData.genera[7].genus,
              evolution: speciesData.evolves_from_species,
              type: data.types[0].type.name,
            };
            setPokemon(newPokemonFormat);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, [currentId]);

  return (
    <div className='pokemonList'>
      {/* <input id="input" /><button onClick={clickHandler}>Click here</button> */}

      <Container id='card-container'>
        {/* <Spinner animation="grow" variant="light" /> */}
        <Card className='bootstrapContainer'>
          <Card.Body id='card-body'>
            <h1 id='card-title'>Pokémon card</h1>
            <Card.Title className='pokemonTitle'>
              <p>{pokemon.name}</p>
              <span className='titleSpan'>
                <i class='fab fa-superpowers'></i>HP {pokemon.hp}
              </span>
            </Card.Title>
            <div id='container'>
              <img alt='pokemon image' id='pokemonImage' src={pokemon.image}></img>
            </div>

            <Card.Img variant='top' className='pokemon-image' />
            <hr className='division-line' />
            <div className='abilities-flex-container'>
              <Button className='bootstrapButton'>Ability</Button>
              <span>{pokemon.ability}</span>
              <span>
                <i class='fas fa-fist-raised'></i>
              </span>
            </div>
            <Card.Text id='cardDetails'>
              <div>
                <p>
                  <strong>Base stats:</strong> {pokemon.stats}
                </p>
                <p>
                  <strong>Attack:</strong> {pokemon.stats}
                </p>
                <p>
                  <strong>Weight:</strong> {pokemon.weight}
                </p>
              </div>
              <img id='pokeball' src={pokeball} alt='' width='110px' />
              <div>
                <p>
                  <strong>Special:</strong> {pokemon.abilityTwo}
                </p>
                <p>
                  <strong>Move:</strong> {pokemon.move}
                </p>
                <p>
                  <strong>Height:</strong> {pokemon.height}
                </p>
              </div>
            </Card.Text>
            <div className='pokemonOrder'>{/* <i class="fas fa-star"></i><Button variant="primary">Previous</Button>
            <Button  variant="primary">Next</Button><i class="fas fa-star"></i> */}</div>
          </Card.Body>
        </Card>
      </Container>

      <Container>
        <div id='form-box'>
          <h1>Form</h1>
          <h3 id='form'>{pokemon.form}</h3>
        </div>
        <Card.Body id='cardBody'>
          <h1>Data</h1>
          <div>
            <p>
              <strong>Color:</strong> {pokemon.color}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Genus:</strong> {pokemon.genus}
            </p>
          </div>
          <div>
            <p>
              <strong>Happines: </strong> {pokemon.base_happiness}
            </p>
            <p>
              <strong>Habitat:</strong> {pokemon.habitat}
            </p>
            <p>
              <strong>Growth rate:</strong> {pokemon.growth_rate}
            </p>
          </div>
        </Card.Body>
        <Container>
          <h1 id='evolution-title'>Evolutions</h1>
          <div id='pokemon-evolution-flex'>
            <Card.Body>
              <EvolutionOne id={currentId} type={type} />
            </Card.Body>
            <Card.Body>
              <EvolutionOne id={parseInt(currentId) + 1} type={type} />
            </Card.Body>
            <Card.Body>
              <EvolutionOne id={parseInt(currentId) + 2} type={type} />
            </Card.Body>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default PokemonCard;
