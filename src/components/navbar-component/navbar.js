import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../homepage-components/assets/symbole.png";
import { COLORS } from "../constants";
import { IoLibraryOutline } from "react-icons/io5";
import { FiStar } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";

export const Navbar = (props) => {
  const { handleLogOut } = props;

  return (
    <>
      <NavBar>
        <LogoDiv to="/">
          <Logo src={logo} />
        </LogoDiv>
        <Nav>
          <NavBTN autoFocus to="/">
            <LibraryIcon />
          </NavBTN>
          <NavBTN to="/popular">
            <FavIcon />
          </NavBTN>
          <NavBTN to="/favourites">
            <LikeIcon />
          </NavBTN>
          <NavBTN to="/contact">
            <ContactIcon />
          </NavBTN>
        </Nav>
        <LogoutBTN onClick={handleLogOut} to="/">
          Logout
        </LogoutBTN>
      </NavBar>
    </>
  );
};

const LogoDiv = styled(NavLink)``;

const LikeIcon = styled(MdFavoriteBorder)`
  width: 1.5rem;
  height: auto;
`;

const ContactIcon = styled(HiOutlineMail)`
  width: 1.5rem;
  height: auto;
`;

const FavIcon = styled(FiStar)`
  width: 1.5rem;
  height: auto;
`;

const LibraryIcon = styled(IoLibraryOutline)`
  width: 1.5rem;
  height: auto;
`;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${COLORS.no4};
  width: 100px;
  height: 100vh;
  display: flex;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Logo = styled.img`
  width: 60px;
  margin-top: 30px;
  cursor: pointer;
`;

const NavBTN = styled(NavLink)`
  text-align: center;
  padding: 20px 0px;
  border-top: 2px solid ${COLORS.no5};
  border-bottom: transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  background-color: transparent;
  color: ${COLORS.no1};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border-left: 3px solid ${COLORS.no1};
  }

  &:active {
    border-left: 3px solid ${COLORS.no1};
    outline: none;
  }

  &:last-child {
    border-bottom: 2px solid ${COLORS.no5};
  }
`;

const LogoutBTN = styled(NavLink)`
  width: 100%;
  height: 35px;
  text-align: center;
  border: none;
  font-size: 12px;
  padding-top: 11px;
  border-radius: 4px;
  background-color: ${COLORS.no3};
  color: ${COLORS.no1};
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.no7};
  }

  &:active {
    background-color: ${COLORS.no7};
    height: 33px;
    border: none;
    outline: none;
    font-size: 11px;
  }

  &:visited {
    text-decoration: none;
  }
`;
