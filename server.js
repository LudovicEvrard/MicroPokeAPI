const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import du package CORS
const app = express();
const port = 3000;
const dataDirectory = 'data';

// Activer CORS pour toutes les routes
app.use(cors());

// this is a simple api who give list json if route don't get API, and get id.json with id

const routes = ['pokemon', 'ability', 'type', 'move'];

routes.forEach(route => {
    // Endpoint for root
    app.get(`/${route}`, (req, res) => {
        const filePath = path.join(__dirname, dataDirectory, route, 'list.json');
        const pokemons = require(filePath).results;
        res.json(pokemons);
    });

    // Endpoint for specific id
    app.get(`/${route}/:id`, (req, res) => {
        const pokemonId = req.params.id;
        const filePath = path.join(__dirname, dataDirectory, route, `${pokemonId}.json`);
        if (fs.existsSync(filePath)) {
            const pokemon = require(filePath);
            res.json(pokemon);
        } else {
            res.status(404).send(`{message: "${route} not found"}`);
        }
    });
});



// Démarrage du serveur
app.listen(port, () => {
    console.log(`API Pokémon prête sur http://localhost:${port}`);
});
