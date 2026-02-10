import { FaPlay } from "react-icons/fa";
import type { Pokemon } from "./graphql/getAllPokemon";
import './Pokemon.css'
import { useState } from "react";

function pokemon(props: { pokemon: Pokemon }) {
    const { pokemon } = props;
    const {
        species,
        sprite, backSprite,
        shinySprite, shinyBackSprite,
        cry,
        catchRate,
        height, weight,
        num,
        types,
        mythical, legendary,
        minimumHatchTime, maximumHatchTime,
    } = pokemon;

    const [spriteClicked, setSpriteClicked] = useState(false);

    const playCry = () => {
        new Audio(cry)
            .play()
            .catch(error => console.error(`Audio playback failed for ${species}'s cry:`, error));
    };

    return (
        <div className="card">
            <div>{species}</div>
            <div>
                <span className="pokemon_image_container" onClick={() => setSpriteClicked(prev => !prev)} >
                    <img src={spriteClicked ? backSprite : sprite} />
                    <img src={spriteClicked ? shinyBackSprite : shinySprite} />
                </span>
            </div>
            <button onClick={playCry}>
                <FaPlay />
            </button>
            <div>Height: {height}m</div>
            <div>Weight: {weight}kg</div>
            <div>Number: {num}</div>
            <div>Types: {Array.from(types.map(type => type.name)).join(', ')}</div>
            {mythical || legendary && (<div>
                {mythical && (<span>Mythical: {mythical}</span>)}
                {legendary && (<span>Legendary: {legendary}</span>)}
            </div>)}
            <div>Catch Rate: {catchRate.base} | {catchRate.percentageWithOrdinaryPokeballAtFullHealth}</div>
            <div>Hatch Time: {minimumHatchTime} steps - {maximumHatchTime} steps</div>
        </div>
    );
}

export default pokemon;