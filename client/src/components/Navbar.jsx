import React, { useState } from "react";
import {
  MdAccountCircle,
  MdClose,
  MdMenu,
  MdVideoCall,
} from "react-icons/md";
import styled from "styled-components/macro";
import Tube from "../images/logo.png";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openNav, closeNav } from "../redux/appSlice";
import AvatarImg from "../images/avatar.png";
import Upload from "./Upload";
import Search from "./Search";

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navOpen = useSelector((state) => state.app.navOpen);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Container className="sticky top-0 shadow-sm h-[56px] z-[5]">
        <Wrapper className="w-full h-full px-5 flex_between gap-x-3">
          <Logo to="/" className="w-7 shrink-0">
            <Img src={Tube} className="w-full" />
          </Logo>

          <Division className="flex items-center justify-end gap-x-3">
            <Search />
            {user ? (
              <User className="hidden md:flex gap-x-2 items-center px-3 rounded-sm">
                <MdVideoCall onClick={() => setOpen(true)} className="text-[2.8rem] cursor-pointer" />
                <Avatar
                  src={user?.imgUrl || AvatarImg}
                  alt="avatar"
                  className={`w-6 h-6 rounded-full`}
                />
                <Text className="text-sm line-clamp-1">{user.name}</Text>
              </User>
            ) : (
              <Button
                to="/signin"
                className="btn hidden md:flex items-center gap-x-1 "
              >
                <MdAccountCircle />
                Sign in
              </Button>
            )}
            <HamburgerMenu
              className="flex md:hidden cursor-pointer"
              onClick={() => dispatch(openNav())}
            >
              <MdMenu size={30} />
            </HamburgerMenu>
          </Division>
        </Wrapper>
        <MenuContainer
          className={`fixed md:hidden flex md:flex-[1.2] top-0 right-0 transform ${
            navOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-200 ease-in-out h-[100svh] min-w-280 z-[10]`}
        >
          <Menu />
          <MdClose
            className="absolute top-6 right-6"
            size={25}
            onClick={() => dispatch(closeNav())}
          />
        </MenuContainer>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

const Container = styled.nav`
  background: ${({ theme }) => theme.bgLighter};
`;
const MenuContainer = styled.aside`
  background-color: ${({ theme }) => theme.bg};
`;
const Logo = styled(Link)``;
const Img = styled.img``;
const Wrapper = styled.div``;

const User = styled.div``;
const Avatar = styled.img``;
const Text = styled.p``;
const Division = styled.div``;
const HamburgerMenu = styled.div``;

const Button = styled(Link)``;
