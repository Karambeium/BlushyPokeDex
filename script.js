import fetch from 'node-fetch'

const dbURL = "http://https://pokeapi.co/api/v2/";

let currentPokemon = {};

/**
 * 1. Get Trainers
 * Implement a function that would retrieve all trainers fromt the db
 * Endpoint: GET /trainer
 */
async function getPokemon() {
    try {
        let pokemon = await fetch(dbURL + "Bulbasaur");
        let data = await pokemon.json();
    }
    catch {
        console.log("Does Not Exist");
    }
}