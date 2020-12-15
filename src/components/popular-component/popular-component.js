import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Navbar } from "../../components/navbar-component/navbar";
import { COLORS } from "../constants";
import fire from "../firebaseConfig";
import { Card } from "../card-component/card";

export const Popular = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const getPopularCocktails = async () => {
    await fetch(`/cocktails/popular`)
      .then((res) => res.json())
      .then((data) => {
        setCocktailData(data.Cocktail.drinks);
      });
  };

  useEffect(() => {
    getPopularCocktails();
  }, []);

  return (
    <>
      <Wrapper>
        <Navbar handleLogOut={handleLogOut} />
        <Main>
          <Setup>
            {cocktailData &&
              cocktailData?.map((drink) => {
                return <Card drink={drink} />;
              })}
          </Setup>
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.no1};
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  position: absolute;
  left: 100px;
  background-color: ${COLORS.no1};
`;

const Setup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 60px 30px 0 30px;
`;
