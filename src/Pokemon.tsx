import { FaPlay } from "react-icons/fa";
import type { Pokemon } from "./graphql/getAllPokemon";
import './Pokemon.css'
import { useState, useEffect } from "react";

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
    const [showShiny, setShowShiny] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Only animate if both regular and shiny sprites exist
        if (!sprite || !shinySprite) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setShowShiny(prev => !prev);
                setIsFading(false);
            }, 600); // Match fade-out duration
        }, 5000);

        return () => clearInterval(interval);
    }, [sprite, shinySprite]);

    const playCry = () => {
        new Audio(cry)
            .play()
            .catch(error => console.error(`Audio playback failed for ${species}'s cry:`, error));
    };

    return (
        <div className="card">
            <div className="name">{species}</div>
            <div className="image_window">
                <span className="pokemon_image_container" onClick={() => setSpriteClicked(prev => !prev)} >
                    <img className={isFading ? 'fading' : ''} src={showShiny ? (spriteClicked ? shinyBackSprite : shinySprite) : (spriteClicked ? backSprite : sprite)} />
                </span>
                <button className="play_button" onClick={playCry}>
                <FaPlay />
            </button>
            </div>
            <div className="stats">
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
        </div>
    );
}

export default pokemon;