import type { Pokemon } from "./graphql/getAllPokemon";

function pokemon(props: { pokemon: Pokemon }) {
    const { pokemon } = props;

    const species = pokemon.species;
    const image = pokemon.sprite;

    return (
        <>
            <div>Species: ${species}</div>
            <div>Image: <img src={image} /></div>
            <div>{JSON.stringify(pokemon)}</div>
        </>
    )
}

export default pokemon;