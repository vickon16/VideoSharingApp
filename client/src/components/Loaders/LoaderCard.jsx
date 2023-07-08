import styled from "styled-components/macro";
import React from "react";

const Loader = ({type}) => {
  return (
    <Container
      className={`w-full ${type === "sm" ? "max-w-[450px]" : "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[250px]"}  py-4 px-2 rounded`}
    >
      <Wrapper className={` p-3 ${type === "sm"
          ? "flex gap-3" : ""}`}>
        <ImageContainer className={`w-full ${type === "sm" ? "h-[110px] max-w-[180px]" : "h-[200px]"}  rounded animate-pulse`} />
        <Details
          className={`flex flex-1 min-w-[120px] min-h-[80px] sm:flex-[0.8] gap-x-2 mt-4`}
        >
          <DetailsImage className={`w-6 h-6 rounded-full`} />
          <div className="flex flex-col gap-y-2 w-full">
            <Title className="p-2 w-[50%]"></Title>
            <ChannelName className="w-[80%] p-2 animate-pulse"></ChannelName>
            <Info className="w-[40%] p-2"></Info>
          </div>
        </Details>
      </Wrapper>
    </Container>
  );
};

export default Loader;
const Container = styled.div``;
const Wrapper = styled.div`
  background: ${({ theme }) => theme.soft2};
`
const ImageContainer = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const Details = styled.div``;
const DetailsImage = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const Title = styled.h3`
  background: ${({ theme }) => theme.soft};
`;
const ChannelName = styled.p`
  background: ${({ theme }) => theme.soft};
`;
const Info = styled.p`
  background: ${({ theme }) => theme.soft};
`;
