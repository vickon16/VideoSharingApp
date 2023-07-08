import React from "react";
import styled from "styled-components/macro";
import Tube from "../images/logo.png";
import {
  MdHome,
  MdExplore,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdLibraryMusic,
  MdSportsEsports,
  MdSportsBasketball,
  MdMovie,
  MdArticle,
  MdLiveTv,
  MdSettings,
  MdFlag,
  MdHelp,
  MdSettingsBrightness,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/appSlice";
import { logoutUser } from "../redux/userSlice";
import { API } from "../utils";

const Menu = () => {
  const darkMode = useSelector((state) => state.app.darkMode);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signOut = async () => {
    await API.get("/api/auth/signout");
    dispatch(logoutUser());
  }

  return (
    <Wrapper className="px-3 sm:px-4 py-6 h-full overflow-y-auto w-full">
      <Logo to={"/"} className="flex items-center gap-2 mb-6">
        <Img src={Tube} className="h-6" />
        <h4>Vickon Tube</h4>
      </Logo>

      <List className="flex flex-col gap-y-2 select-none">
        <Item to="/">
          <MdHome />
          Home
        </Item>
        <Item to="/?type=trend">
          <MdExplore />
          Explore
        </Item>
        <Item to="/?type=sub">
          <MdSubscriptions />
          Subscriptions
        </Item>
        <Hr />
        <Item>
          <MdVideoLibrary />
          Library
        </Item>
        <Item>
          <MdHistory />
          History
        </Item>

        <Hr />

        {user ? (
          <Logout className="my-1">
            <button className="btn2" onClick={signOut}>Sign Out</button>
          </Logout>
        ) : (
          <Login className="my-1">
            <Text>Sign in to like videos, comment, and subscribe.</Text>
            <Button to="/signin" className="btn mt-3">
              Sign In
            </Button>
          </Login>
        )}

        <Hr />

        <Title className="text-lg tracking-tight">BEST OF VICKONARY</Title>

        <Item>
          <MdLibraryMusic />
          Music
        </Item>
        <Item>
          <MdSportsBasketball />
          Sports
        </Item>
        <Item>
          <MdSportsEsports />
          Gaming
        </Item>
        <Item>
          <MdMovie />
          Movies
        </Item>
        <Item>
          <MdArticle />
          News
        </Item>
        <Item>
          <MdLiveTv />
          Live
        </Item>
        <Hr />

        <Item>
          <MdSettings />
          Settings
        </Item>
        <Item>
          <MdFlag />
          Report
        </Item>
        <Item>
          <MdHelp />
          Help
        </Item>

        <Hr />
        <Item onClick={() => dispatch(toggleMode())}>
          <MdSettingsBrightness />
          <Mode className="px-3 rounded text-sm py-1">
            {darkMode ? "Light" : "Dark"} Theme
          </Mode>
        </Item>
      </List>
    </Wrapper>
  );
};

export default Menu;

const Wrapper = styled.section``;
const Logo = styled(Link)``;
const Img = styled.img``;
const List = styled.ul``;
const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};

  &:hover:not(:last-child) {
    background: ${({ theme }) => theme.soft};
  }

  svg {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Hr = styled.hr`
  margin: 3px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Title = styled.h2``;
const Text = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
const Login = styled.div``;
const Logout = styled.div``;
const Button = styled(Link)``;
const Mode = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bg};
`;
