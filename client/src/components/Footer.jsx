import React from 'react'
import styled from 'styled-components'
import Tube from "../images/logo.png";

const Footer = () => {
  return (
    <Container className='flex_center flex-col gap-y-4 py-8 shadow w-full'>
      <Logo className="flex items-center gap-2">
          <Img src={Tube} className="h-6" />
          <h4>Vickon Tube</h4>
      </Logo>

      <Paragraph>
        @2023 Vickonary | Cyril Web
      </Paragraph>

      <Paragraph className='text-xs'>
        &copy; All rights reserved.
      </Paragraph>
    </Container>
  )
}

export default Footer

const Container = styled.footer``

const Logo = styled.div``;
const Paragraph = styled.p`
  color : ${({theme}) => theme.textSoft};
`;
const Img = styled.img``;