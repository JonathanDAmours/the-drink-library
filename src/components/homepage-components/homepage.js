import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import cocktailVideo from "./assets/cocktailHome.mp4";
import logo from "./assets/logoPale.png";
import { COLORS } from "../constants";
import fire from "../firebaseConfig";
import { Overview } from "../overview-component/overview";
import { firestore } from "../firebaseConfig";

export const HomePage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleSignUp = async () => {
    clearErrors();
    const userCredentials = await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });

    // firestore.collection("users").add({
    //   email: userCredentials.user.email,
    //   providerId: userCredentials.user.providerId,
    // });

    await firestore.collection("users").doc(userCredentials.user.uid).set({
      email: userCredentials.user.email,
      providerId: userCredentials.user.providerId,
    });
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        dispatch({ currentUser: user, type: "SIGN_IN" });
      } else {
        dispatch({ currentUser: user, type: "SIGN_OUT" });
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {user ? (
        <Overview handleLogOut={handleLogOut} />
      ) : (
        <Wrapper>
          <Main>
            <VideoWrap>
              <Video autoPlay playsInline muted loop>
                <source src={cocktailVideo} type="video/mp4"></source>
              </Video>
            </VideoWrap>
            <SideWrap>
              <Logo src={logo} />
              <SignUpForm>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  type="password"
                  placeholder="Password"
                  require
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                {hasAccount ? (
                  <ButtonDiv>
                    <LoginSUBMIT onClick={handleLogin}>Login</LoginSUBMIT>
                    <Text>
                      Don't have an account ?{" "}
                      <Span onClick={() => setHasAccount(!hasAccount)}>
                        Sign Up
                      </Span>
                    </Text>
                  </ButtonDiv>
                ) : (
                  <ButtonDiv>
                    <ButtonCR onClick={handleSignUp}>Create account</ButtonCR>
                    <Text>
                      Have an account ?{" "}
                      <Span onClick={() => setHasAccount(!hasAccount)}>
                        Login
                      </Span>
                    </Text>
                  </ButtonDiv>
                )}
              </SignUpForm>
              <ErrorDiv>
                _
                <ErrSpan>
                  {emailError}
                  {passwordError}
                </ErrSpan>
                _
              </ErrorDiv>
            </SideWrap>
          </Main>
        </Wrapper>
      )}
    </>
  );
};

const ErrorDiv = styled.p`
  margin: 10px;
  font-weight: bold;
  font-size: 10px;
  color: ${COLORS.no4};
`;

const ErrSpan = styled.span`
  font-weight: bold;
  font-size: 10px;
  color: FireBrick;
`;

const Span = styled.span`
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${COLORS.no7};
  }
`;

const Text = styled.p`
  color: ${COLORS.no1};
  font-size: 10px;
  margin: 20px 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  background-color: ${COLORS.no5};
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
`;

const VideoWrap = styled.div`
  background-color: ${COLORS.no5};
  width: 50%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const Video = styled.video`
  width: auto;
  height: 100%;
`;

const slideOnMount = keyframes`
  0% { right: -50vw}
  100% { right: 0 }
`;

const SideWrap = styled.div`
  width: 50vw;
  position: absolute;
  right: 0;
  background-color: ${COLORS.no4};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-name: ${slideOnMount};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  transition-timing-function: ease-out;
`;

const Logo = styled.img`
  width: 260px;
`;

const ButtonCR = styled.button`
  width: 220px;
  height: 35px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.no1};
  color: ${COLORS.no4};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.no6};
  }

  &:active {
    background-color: ${COLORS.no6};
    width: 210px;
    height: 33px;
    border: none;
    outline: none;
    font-size: 11px;
  }
`;

const SignUpForm = styled.div`
  padding: 10px 10px;
  margin: 20px 0;
  background-color: ${COLORS.no4};
  border-radius: 10px;
  box-shadow: inset 0px 0px 6px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 12px;
  text-align: center;
  color: ${COLORS.no1};
  width: 220px;
  padding: 10px;
  margin: 10px 10px;
  background-color: ${COLORS.no5};
  outline: none;
  border: none;
  border-radius: 4px;

  &::placeholder {
    color: ${COLORS.no1};
    opacity: 0.3;
  }
`;

const LoginSUBMIT = styled.button`
  width: 220px;
  height: 35px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.no3};
  color: ${COLORS.no1};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.no7};
  }
`;
