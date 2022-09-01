//Initialize pokemon data to the database
//File summary: This is a seeds file, which basically initializes data, and stores it to the database
// Think of it like an initialization function where we need to initialize variables.
const { default: axios } = require('axios');
const mongoose = require('mongoose');
const Pokemon = require('./public/models/pokemon');
   //
//Allows DELETE/PUT/PATCH in HTML forms.
//We need to connect to the database in order to store the objects.
mongoose.connect('mongodb://localhost:27017/pokemon', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

async function retreivePokemonData(){
    const allPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1155&offset=0');
    const pokemons = allPokemon.data.results    //{name, url}
    const pokemonSchemas = [];
    for(pokemon of pokemons){
        const name = pokemon.name;
        const pokemonData = await axios.get(`${pokemon.url}`);
        const image = pokemonData.data.sprites.front_default;
        if(image != null && !name.includes('-')){
            pokemonsSchema = new Pokemon({name: name, image: image});
            pokemonSchemas.push(pokemonsSchema);
            console.log(`Adding ${name} ${image}`);
        }
    }
    Pokemon.insertMany(pokemonSchemas)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });
}

retreivePokemonData();