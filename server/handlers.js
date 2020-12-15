const fetch = require("isomorphic-fetch");
require("dotenv").config();
const APIKEY = process.env.APIKEY;

//-----HANDLERS-----//
const getHandler = async (req, res) => {
  const { id, name, letter, ingredient } = req.query;
  switch (true) {
    case !!id:
      req.drinkId = id;
      getCocktailsById(req, res);
      break;
    case !!name:
      req.drinkName = name;
      getCocktailsByName(req, res);
      break;
    case !!letter:
      req.drinkLetter = letter;
      getCocktailsByLetter(req, res);
      break;
    case !!ingredient:
      req.drinkIngredient = ingredient;
      getCocktailsByIngredient(req, res);
      break;
    default:
    // code block
  }
};

const getCocktailsByName = async (req, res) => {
  try {
    const cocktailName = req.drinkName;
    console.log(cocktailName);
    const requestCocktailName = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/search.php?s=${cocktailName}`
    );
    const data = await requestCocktailName.json();
    res.status(200).json({ status: 200, Cocktail: data });
  } catch (error) {
    res.status(400).json({ status: 400 });
    console.log(error.message);
  }
};

const getCocktailsByIngredient = async (req, res) => {
  try {
    const cocktailIngredient = req.drinkIngredient;
    console.log(cocktailIngredient);
    const requestCocktailIngredient = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/filter.php?i=${cocktailIngredient}`
    );
    const data = await requestCocktailIngredient.json();
    res.status(200).json({ status: 200, Cocktail: data });
  } catch (error) {
    res.status(400).json({ status: 400 });
    console.log(error.message);
  }
};

const getCocktailsByLetter = async (req, res) => {
  try {
    const drinkLetter = req.drinkLetter;
    console.log(drinkLetter);
    const requestCocktailLetter = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/search.php?f=${drinkLetter}`
    );
    const data = await requestCocktailLetter.json();
    res.status(200).json({ status: 200, Cocktail: data });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
    console.log(error.message);
  }
};

const getCocktailsById = async (req, res) => {
  try {
    const cocktailID = req.drinkId;
    console.log(cocktailID);
    const requestCocktailID = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/lookup.php?i=${cocktailID}`
    );
    const data = await requestCocktailID.json();
    res.status(200).json({ status: 200, Cocktail: data });
  } catch (error) {
    res.status(400).json({ status: 400 });
    console.log(error.message);
  }
};

const getPopularCocktails = async (req, res) => {
  try {
    const requestCocktailID = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/popular.php`
    );
    const data = await requestCocktailID.json();
    res.status(200).json({ status: 200, Cocktail: data });
  } catch (error) {
    res.status(400).json({ status: 400 });
    console.log(error.message);
  }
};

module.exports = {
  getHandler,
  getCocktailsByName,
  getCocktailsByIngredient,
  getCocktailsByLetter,
  getCocktailsById,
  getPopularCocktails,
};
