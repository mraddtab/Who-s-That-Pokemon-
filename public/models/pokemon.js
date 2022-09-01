//File Summary: The product.js file contains a Schema for a pokemon
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;