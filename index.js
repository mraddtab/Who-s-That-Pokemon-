const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Pokemon = require('./public/models/pokemon');
mongoose.connect('mongodb://localhost:27017/pokemon', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));    //Allows you to start server outside of working directory
app.set('view engine', 'ejs');                      //Enables EJS
(express.urlencoded({extended: true}));             //makes req.body a JSON object
app.use(methodOverride('_method'));                 //Allows DELETE/PUT/PATCH in HTML forms.
app.use(express.static("public"));                  //Allows ejs to include css
app.use(express.static("views"));                  

//Renders the home page
app.get("/pokemon/home", async (req,res) => {
    const pokemonImg = await getRandomPokemon();
    res.render("home", {pokemonImg});
}) 
app.get("/pokemon/login", (req,res) => {
    res.render("login");
}) 
app.get("/pokemon/register", (req,res) => {
    res.render("register");
}) 
app.get("*", (req,res) => {
    res.send("Error");
    
}) 

async function getRandomPokemon(){
    const random_pokemon = await Pokemon.aggregate([{ $sample: { size: 1 } }]);
    return random_pokemon[0].image;
}

getRandomPokemon();
app.listen(3000, () => {
    console.log("Connceting on port 3000");
})

