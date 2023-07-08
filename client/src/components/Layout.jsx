import React from "react";
import styled from "styled-components/macro";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Container className="flex">
      <MenuContainer
        className={`hidden md:flex sticky md:flex-[1.2] top-0 h-[100svh] min-w-280`}
      >
        <Menu />
      </MenuContainer>
      <Main className="flex-[1] md:flex-[6.8]">
        <Navbar />
        <Wrapper className="min-h-[100svh] py-6 px-3 md:px-6">
          <Outlet />
        </Wrapper>
        <Footer />
      </Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const MenuContainer = styled.aside`
  background-color: ${({ theme }) => theme.bg};
`;
const Main = styled.aside``;
const Wrapper = styled.section``;
