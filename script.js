// import fetch from 'node-fetch';

const dbURL = "https://pokeapi.co/api/v2/";

let currentPokemon = {};
let currentPokemonData = {};

async function getPokemon(name) {
    try {
        currentPokemon = await fetch(dbURL + "pokemon/" + name);
        currentPokemonData = await currentPokemon.json();
        console.log(currentPokemonData);
    }
    catch {
        console.log("Does Not Exist");
    }
}