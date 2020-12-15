import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
// const APIKEY = process.env.REACT_APP_APIKEY;

export const IndexABC = (props) => {
  const { getCocktailsByLetter } = props;

  return (
    <>
      <Index>
        <LetterButton autoFocus onClick={() => getCocktailsByLetter("a")}>
          A
        </LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("B")}>B</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("C")}>C</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("D")}>D</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("E")}>E</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("F")}>F</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("G")}>G</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("H")}>H</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("I")}>I</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("J")}>J</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("K")}>K</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("L")}>L</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("M")}>M</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("N")}>N</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("O")}>O</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("P")}>P</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("Q")}>Q</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("R")}>R</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("S")}>S</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("T")}>T</LetterButton>
        <LetterButton disabled onClick={() => getCocktailsByLetter("U")}>
          U
        </LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("V")}>V</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("W")}>W</LetterButton>
        <LetterButton disabled onClick={() => getCocktailsByLetter("X")}>
          X
        </LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("Y")}>Y</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("Z")}>Z</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("1")}>1</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("2")}>2</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("3")}>3</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("4")}>4</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("5")}>5</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("6")}>6</LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("7")}>7</LetterButton>
        <LetterButton disabled onClick={() => getCocktailsByLetter("8")}>
          8
        </LetterButton>
        <LetterButton onClick={() => getCocktailsByLetter("9")}>9</LetterButton>
      </Index>
    </>
  );
};

const Index = styled.div`
  position: sticky;
  z-index: 99999;
  top: right 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: ${COLORS.no3};
`;

const LetterButton = styled.button`
  text-align: center;
  font-size: 14px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  color: ${COLORS.no1};
  font-weight: bold;
  cursor: pointer;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;

  &:hover {
    border: 1px solid ${COLORS.no1};
    background-color: ${COLORS.no7};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
