// import fetch from 'node-fetch';

const dbURL = "https://pokeapi.co/api/v2/";

let currentPokemon = {};
let currentPokemonData = {};
let index;

async function getPokemonByName(name) {
    try {
        currentPokemon = await fetch(dbURL + "pokemon/" + name);
        currentPokemonData = await currentPokemon.json();
        console.log(currentPokemonData);
        index = currentPokemonData.id;
        console.log(index);
        populateData();
    }
    catch {
        console.log("Does Not Exist");
    }
}

async function getPokemonByIndex(id) {
    try {
        index = id;
        currentPokemon = await fetch(dbURL + "pokemon/" + index);
        currentPokemonData = await currentPokemon.json();
        console.log(currentPokemonData);
        console.log(index);
        populateData();
    }
    catch {
        console.log("Does Not Exist");
    }
}

async function incrementPokemonUp() {
    checkIndex();
    index++;
    if (index === 152) {
        index = 1;
    }
    try {
        getPokemonByIndex(index);
        console.log(index);
        populateData();
    }
    catch {
        console.log("Does Not Exist");
    }
}

async function incrementPokemonDown() {
    checkIndex();
    index--;
    if (index === 0) {
        index = 151;
    }
    try {
        getPokemonByIndex(index);
        console.log(index);
        populateData();
    }
    catch {
        console.log("Does Not Exist");
    }
}

function checkIndex() {
    if(typeof(index) === "undefined") {
        index = 0;
    }
}

function populateData() {
    document.getElementById("pokemonImage").src = currentPokemonData.sprites.front_default;
    console.log(document.getElementById("pokemonImage").src);
}