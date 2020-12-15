import React from "react";
import styled from "styled-components";
import { Navbar } from "../navbar-component/navbar";
import { COLORS } from "../constants";
import { Card } from "../card-component/card";
import { IndexABC } from "../index-component/indexABC";
import { useDispatch, useSelector } from "react-redux";
import { storeCocktails } from "../../redux/actions";
import logo from "../homepage-components/assets/logoPale.png";

export const Overview = (props) => {
  const { handleLogOut } = props;

  const cocktailState = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const getCocktailsByLetter = async (letterRequested) => {
    await fetch(`/cocktails/get?letter=${letterRequested}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(storeCocktails({ cocktailList: res.Cocktail.drinks }));
      });
  };

  const drinkData = cocktailState.cocktailsReducer.cocktailList;
  return (
    <>
      <Wrapper>
        <Navbar handleLogOut={handleLogOut} />
        <Main>
          <Section>
            <IndexABC getCocktailsByLetter={getCocktailsByLetter} />
            <CocktailSet>
              {!drinkData ? (
                <BackgroundSet>
                  <SideWrap>
                    <Logo src={logo} />
                  </SideWrap>
                </BackgroundSet>
              ) : (
                <Setup>
                  {drinkData &&
                    drinkData?.map((drink) => {
                      return <Card drink={drink} />;
                    })}
                </Setup>
              )}
            </CocktailSet>
          </Section>
        </Main>
      </Wrapper>
    </>
  );
};

const BackgroundSet = styled.div`
  width: 100%;
  height: 96vh;
  overflow: hidden;
  position: relative;
`;

const Setup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 60px 30px 0 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const CocktailSet = styled.div`
  align-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  display: flex;
  background-color: ${COLORS.no4};
  width: 100vw;
  height: 100%;
`;

const Main = styled.div`
  width: 100%;
  margin-left: 100px;
  background-color: ${COLORS.no1};
  height: 100%;
  min-height: 100vh;
`;

const SideWrap = styled.div`
  width: 100%;
  background-color: ${COLORS.no5};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 260px;
`;
