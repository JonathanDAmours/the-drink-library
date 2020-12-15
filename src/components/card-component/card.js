import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated as a } from "react-spring";
import styled from "styled-components";
import { COLORS } from "../constants";
import blackNotFound from "../homepage-components/assets/blackblack.jpg";
import { MdFavorite } from "react-icons/md";
import { firestore } from "../firebaseConfig";

export const Card = (props) => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const [flipped, set] = useState(false);
  const [cocktail, setCocktail] = useState([]);
  const preData = [];
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const { drink } = props;

  const handleLike = async (ev) => {
    ev.stopPropagation();
    const favouritesCollection = firestore.collection("favourites");
    const userRef = firestore.collection("users").doc(currentUser.uid);
    const favouritedCocktails = await favouritesCollection
      .doc(`${currentUser.uid}_${drink.idDrink}`)
      .set({
        userRef: userRef,
      });
  };

  const handleUnlike = async (ev) => {
    ev.stopPropagation();
    const favouritesCollection = firestore.collection("favourites");
    const deleted = await favouritesCollection
      .doc(`${currentUser.uid}_${drink.idDrink}`)
      .delete();
  };

  const getAlreadyFavourited = async () => {
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
    setCocktail(favIds);
  };

  useEffect(() => {
    if (currentUser?.uid) {
      getAlreadyFavourited();
    }
  }, [currentUser?.uid, cocktail]);

  console.log(drink);
  return (
    <>
      <CardFlip onClick={() => set((state) => !state)}>
        <CardFront
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <CardLeft>
            {!drink.strDrinkThumb ? (
              <EmptyAvatar src={blackNotFound}></EmptyAvatar>
            ) : (
              <ImageCocktail src={drink.strDrinkThumb}></ImageCocktail>
            )}
            <GeneralInfo>
              <Name>{drink.strDrink}</Name>
              <Base>Cocktail base:</Base>
              <BaseIngredient>
                {drink.strIngredient1.toUpperCase()}
              </BaseIngredient>
            </GeneralInfo>
          </CardLeft>
          <CardRight>
            <IngredientList>
              {!drink.strIngredient1 ? null : (
                <Ing>
                  <Span>{drink.strMeasure1}</Span>
                  {drink.strIngredient1}
                </Ing>
              )}
              {!drink.strIngredient2 ? null : (
                <Ing>
                  <Span>{drink.strMeasure2}</Span>
                  {drink.strIngredient2}
                </Ing>
              )}
              {!drink.strIngredient3 ? null : (
                <Ing>
                  <Span>{drink.strMeasure3}</Span>
                  {drink.strIngredient3}
                </Ing>
              )}
              {!drink.strIngredient4 ? null : (
                <Ing>
                  <Span>{drink.strMeasure4}</Span>
                  {drink.strIngredient4}
                </Ing>
              )}
              {!drink.strIngredient5 ? null : (
                <Ing>
                  <Span>{drink.strMeasure5}</Span>
                  {drink.strIngredient5}
                </Ing>
              )}
              {!drink.strIngredient6 ? null : (
                <Ing>
                  <Span>{drink.strMeasure6}</Span>
                  {drink.strIngredient6}
                </Ing>
              )}
              {!drink.strIngredient7 ? null : (
                <Ing>
                  <Span>{drink.strMeasure7}</Span>
                  {drink.strIngredient7}
                </Ing>
              )}
              {!drink.strIngredient8 ? null : (
                <Ing>
                  <Span>{drink.strMeasure8}</Span>
                  {drink.strIngredient8}
                </Ing>
              )}
              {!drink.strIngredient9 ? null : (
                <Ing>
                  <Span>{drink.strMeasure9}</Span>
                  {drink.strIngredient9}
                </Ing>
              )}
              {!drink.strIngredient10 ? null : (
                <Ing>
                  <Span>{drink.strMeasure10}</Span>
                  {drink.strIngredient10}
                </Ing>
              )}
              {!drink.strIngredient11 ? null : (
                <Ing>
                  <Span>{drink.strMeasure11}</Span>
                  {drink.strIngredient11}
                </Ing>
              )}
              {!drink.strIngredient12 ? null : (
                <Ing>
                  <Span>{drink.strMeasure12}</Span>
                  {drink.strIngredient12}
                </Ing>
              )}
            </IngredientList>
            {cocktail.find((id) => id === drink.idDrink) ? (
              <LikeDivRed onClick={handleUnlike}>
                <LikeIcon />
              </LikeDivRed>
            ) : (
              <LikeDiv onClick={handleLike}>
                <LikeIcon />
              </LikeDiv>
            )}
          </CardRight>
        </CardFront>
        <CardBack
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateY(180deg)`),
          }}
        >
          <CardbackDiv>
            {!drink.strDrinkThumb ? (
              <EmptyAvatarBack src={blackNotFound}></EmptyAvatarBack>
            ) : (
              <ImageCocktailBack src={drink.strDrinkThumb}></ImageCocktailBack>
            )}
            {cocktail.find((id) => id === drink.idDrink) ? (
              <LikeDivRed onClick={handleUnlike}>
                <LikeIcon />
              </LikeDivRed>
            ) : (
              <LikeDiv onClick={handleLike}>
                <LikeIcon />
              </LikeDiv>
            )}
            <InstDiv>
              <Instructions>{drink.strInstructions}</Instructions>
            </InstDiv>
          </CardbackDiv>
        </CardBack>
      </CardFlip>
    </>
  );
};

const IngredientList = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Ing = styled.p`
  color: ${COLORS.no1};
  font-size: 11px;
  font-weight: bold;
  padding: 2px 0 0 0;
`;

const Span = styled.span`
  font-size: 11px;
  font-weight: 400;
  padding: 2px 3px 0 0;
`;

const GeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-content: left;
  padding: 20px;
  margin-top: 70px;
`;

const Name = styled.h1`
  color: ${COLORS.no1};
  padding-bottom: 20px;
  font-size: 16px;
`;

const BaseIngredient = styled.h1`
  color: ${COLORS.no1};
  font-size: 14px;
`;

const Base = styled.p`
  color: ${COLORS.no1};
  opacity: 0.6;
  font-style: italic;
  font-size: 10px;
  padding-bottom: 5px;
`;

const InstDiv = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100%;
`;

const Instructions = styled.p`
  padding: 0 30px;
  text-align: center;
  color: ${COLORS.no1};
  font-size: 10px;
  line-height: 1.2em;
`;

const LikeDivRed = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${COLORS.no5};
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  cursor: pointer;
`;

const LikeDiv = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${COLORS.no5};
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  cursor: pointer;
`;

const LikeIcon = styled(MdFavorite)`
  width: 1rem;
  height: auto;
  transform: translateX(-2px);

  &:active {
    width: 0.8rem;
  }
`;

const CardbackDiv = styled.div`
  width: 420px;
  height: 200px;
  border-radius: 25px;
  background-color: ${COLORS.no4};
  position: relative;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;

const CardFlip = styled.div`
  position: relative;
`;

const CardBack = styled(a.div)`
  position: absolute;
  top: 20px;
  left: 60px;
`;

const CardFront = styled(a.div)`
  display: flex;
  margin: 20px 60px 80px 60px;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 180px;
  height: 200px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: ${COLORS.no4};
  position: relative;
  border-right: 3px solid ${COLORS.no1};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;

const CardRight = styled.div`
  justify-content: space-between;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.35);
  box-shadow: 0 0 40px rgba(15, 15, 15, 0.15);
  position: relative;
`;

const ImageCocktail = styled.img`
  position: absolute;
  top: -60px;
  width: 120px;
  left: 30px;
  border-radius: 50%;
  height: auto;
  border: 4px solid ${COLORS.no1};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;

const EmptyAvatar = styled.img`
  position: absolute;
  top: -60px;
  left: 30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${COLORS.no5};
  height: auto;
  border: 4px solid ${COLORS.no1};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;

const ImageCocktailBack = styled.img`
  position: absolute;
  top: -60px;
  left: 30px;
  width: 120px;
  border-radius: 50%;
  height: auto;
  border: 4px solid ${COLORS.no1};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;

const EmptyAvatarBack = styled.img`
  position: absolute;
  top: -60px;
  left: 30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${COLORS.no5};
  height: auto;
  border: 4px solid ${COLORS.no1};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(15, 15, 15, 0.15);
`;
