// import fetch from 'node-fetch';

const dbURL = "https://pokeapi.co/api/v2/";

let currentPokemon = {};
let currentPokemonData = {};
let index;
let info;
let moves;
let currentPokemonLocations = {};
let currentLocationsJSON = {};

async function getPokemonByName(name) {
    try {
        document.getElementById("pokemonImage").src = "";
        document.getElementById("info").innerHTML = "";
        document.getElementById("moves").innerHTML = "";
        document.getElementById("location").innerHTML = "";
        index = null;
        currentPokemon = await fetch(dbURL + "pokemon/" + name);
        currentPokemonData = await currentPokemon.json();
        console.log(currentPokemonData);
        index = currentPokemonData.id;
        console.log(index);
        currentPokemonLocations = await fetch(dbURL + "pokemon/" + currentPokemonData.id + "/encounters");
        currentLocationsJSON = await currentPokemonLocations.json();
        // console.log(currentLocationsJSON);
        populateData();
        return;
    }
    catch (error){
        console.log(error);
        index = null;
        document.getElementById("pokemonImage").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/220px-Generic_error_message.png";
        document.getElementById("info").innerHTML = "No Details, Invalid Pokemon";
        document.getElementById("moves").innerHTML = "No Moves, Invalid Pokemon";
        document.getElementById("location").innerHTML = "CANNOT BE CAUGHT IN THE WILD";
    }
}

async function getPokemonByIndex(id) {
    try {
        document.getElementById("pokemonImage").src = "";
        document.getElementById("info").innerHTML = "";
        document.getElementById("moves").innerHTML = "";
        index = id;
        currentPokemon = await fetch(dbURL + "pokemon/" + index);
        currentPokemonData = await currentPokemon.json();
        console.log(currentPokemonData);
        console.log(index);
        populateData();
        currentPokemonLocations = await fetch(dbURL + "pokemon/" + id + "/encounters");
        currentLocationsJSON = await currentPokemonLocations.json();
        console.log(currentLocationsJSON);
        return;
    }
    catch (error) {
        console.log(error);
        index = null;
        document.getElementById("pokemonImage").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/220px-Generic_error_message.png";
        document.getElementById("info").innerHTML = "No Details, Invalid Pokemon";
        document.getElementById("moves").innerHTML = "No Moves, Invalid Pokemon";
        document.getElementById("locations").innerHTML = "CANNOT BE CAUGHT IN THE WILD";
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
        console.log("oops");
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
        console.log("oops");
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
    info = 
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
    document.getElementById("info").innerHTML = info;
    let locationList = "";
    currentLocationsJSON.forEach(location => {
        console.log(location.location_area.name);
        areaPieces = location.location_area.name.split("-");
        let a = "";
        areaPieces.forEach(area => {
            a += (area.substring(0,1).toUpperCase() + area.substring(1) + " ");
        });
        a += "<br>"
        locationList += a;
    });
    console.log(currentLocationsJSON);
    document.getElementById("location").innerHTML = locationList;
    console.log(locationList);
}

function stringFormatter(str) {
    let temp = "";
    let strArr = str.split("-");
    strArr = strArr.map(string => string.substring(0,1).toUpperCase() + string.substring(1));
    strArr.forEach(string => temp += string + " ");
    return(temp);
}

function locationStringFormatter(str) {
    let temp = "";
    let strArr = str.split("-");
    strArr = strArr.map(string => string.substring(0,1).toUpperCase() + string.substring(1));
    strArr.forEach(string => temp += string + "<br>");
    return(temp);
}

function show(id) {
    document.getElementById(id).style.display = "block";
    if (id === "moves") {
        document.getElementById("info").style.display = "none";
    } else if (id === "info") {
        document.getElementById("moves").style.display = "none";
        if (document.getElementById("moves").style.height >= "25vw") {
            document.getElementById("moves").style.overflow = "scroll"
        }
    }
}