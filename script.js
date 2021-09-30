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
    let infoString = "";
    infoString += 
    document.getElementById("info").innerHTML = 
        "Height: " + currentPokemonData.height + "<br>" + 
        "Weight: " + currentPokemonData.weight + "<br>" +
        "HP: " + currentPokemonData.stats[0].base_stat + "<br>" +
        "Attack: " + currentPokemonData.stats[1].base_stat + "<br>" +
        "Defense: " + currentPokemonData.stats[2].base_stat + "<br>" +
        "Special Attack: " + currentPokemonData.stats[3].base_stat + "<br>" +
        "Special Defense: " + currentPokemonData.stats[4].base_stat + "<br>" +
        "Speed: " + currentPokemonData.stats[5].base_stat + "<br>";
    document.getElementById("moves").innerHTML = "";
    currentPokemonData.moves.forEach(move => document.getElementById("moves").innerHTML += (stringFormatter(move.move.name) + "<br>"));
    console.log(document.getElementById("moves").innerHTML);
}

function stringFormatter(str) {
    let temp = "";
    let strArr = str.split("-");
    strArr = strArr.map(string => string.substring(0,1).toUpperCase() + string.substring(1));
    // strArr.forEach(string => string = string.toUpperCase());
    strArr.forEach(string => temp += string + " ");
    return(temp);
}