const fetch = require("isomorphic-fetch");
require("dotenv").config();
const APIKEY = process.env.APIKEY;

const admin = require("firebase-admin");
const serviceAccount = require("../cocktail-app-1d4cb-3701bbd77edf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fetchDrinks = async () => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/filter.php?a=Alcoholic`
  );
  const data = await response.json();
  return data.drinks;
};

const fetchDrinks2 = async () => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/filter.php?a=Non_Alcoholic`
  );
  const data = await response.json();
  return data.drinks;
};

const batchImport = async (drinks) => {
  const db = admin.firestore();
  const batch = db.batch();

  drinks.forEach((drink) => {
    const drinkRef = db.collection(`Cocktail_ID`).doc(drink.idDrink);
    batch.set(drinkRef, drink);
  });

  await batch.commit();
};

const runImport = async () => {
  const drinks = await fetchDrinks();
  const drinksFetch = await fetchDrinks2();
  const drinks1 = drinks.slice(0, 250);
  const drinks2 = drinks.slice(250);
  const drinks3 = drinksFetch;

  await batchImport(drinks1);
  await batchImport(drinks2);
  await batchImport(drinks3);
};

runImport();
