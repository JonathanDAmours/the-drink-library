import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Navbar } from "../../components/navbar-component/navbar";
import { COLORS } from "../constants";
import fire from "../firebaseConfig";
import { Card } from "../card-component/card";
import { firestore } from "../firebaseConfig";
const APIKEY = process.env.REACT_APP_APIKEY;

export const Favourites = () => {
  console.log(APIKEY, "THIS IS MY APIKEY NUMBER");
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const preData = [];
  const [cocktailData, setCocktailData] = useState([]);

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const getFavourites = async () => {
    const favouritesCollection = firestore.collection("favourites");
    const userRef = firestore.collection("users").doc(currentUser?.uid);
    const favouritesCocktails = await favouritesCollection
      .where("userRef", "==", userRef)
      .get();
    const myFavouriteCocktails = favouritesCocktails.docs.map((cocktail) => ({
      ...cocktail.data(),
      id: cocktail.id,
    }));
    myFavouriteCocktails.map((id) => {
      preData.push(id.id);
    });
    const favIds = preData.map((id) => {
      return id.split("_")[1];
    });

    const reads = favIds.map((res) => {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v2/${APIKEY}/lookup.php?i=${res}`
      );
    });

    const rawData = await Promise.all(reads);
    const results = rawData.map((item) => {
      return item.json();
    });

    const finalResults = await Promise.all(results);

    setCocktailData(finalResults);
  };

  useEffect(() => {
    if (currentUser?.uid) {
      getFavourites();
    }
  }, [currentUser?.uid, cocktailData]);

  console.log(cocktailData);

  return (
    <>
      <Wrapper>
        <Navbar handleLogOut={handleLogOut} />
        <Main>
          <Setup>
            {cocktailData &&
              cocktailData?.map((drink) => {
                return <Card drink={drink.drinks[0]} />;
              })}
          </Setup>
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.no5};
  position: relative;
  width: 100vw;
  height: 100%;
`;

const Main = styled.div`
  position: absolute;
  left: 100px;
  width: 100vw;
  transform: translateX(-100px);
  padding-left: 100px;
  min-height: 100vh;
  background-color: ${COLORS.no1};
`;

const Setup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 60px 30px 0 30px;
  background-color: ${COLORS.no1};
`;
