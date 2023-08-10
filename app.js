const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  res.render("index", { pokemonList });
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokeBank.find(id);
  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  } else {
    res.render("details", { pokemon });
  }
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});