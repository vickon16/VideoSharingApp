import React from "react";
import styled from "styled-components/macro";
import SignInUser from "../components/SignInUser";
import SignUpUser from "../components/SignUpUser";
import SignInProvider from "../components/SignInProvider";

const AuthPage = () => {
  return (
    <Overlay className="fixed inset-0 z-[4] h-[100svh]">
      <Container className="w-full h-full flex_center">
        <Wrapper className="w-full max-w-md rounded shadow-md py-5 px-8 flex items-center gap-y-3 flex-col">
          <SignInUser />

          <Or className="my-2">or</Or>

          <SignUpUser />

          <Or className="my-2">or</Or>

          <SignInProvider />
        </Wrapper>
      </Container>
    </Overlay>
  );
};

export default AuthPage;

const Overlay = styled.section`
  background-color: ${({ theme }) => theme.bg};
`;

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Or = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    content: "";
    background-color: ${({ theme }) => theme.soft};
    height: 1px;
    width: 45%;
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 0;
    content: "";
    background-color: ${({ theme }) => theme.soft};
    height: 1px;
    width: 45%;
  }
`;
