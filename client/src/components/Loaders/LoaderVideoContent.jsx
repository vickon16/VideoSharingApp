import styled from "styled-components/macro";
import React from "react";
import LoaderCard from "./LoaderCard"

const LoaderVideoContent = () => {
  return (
    <Container className="flex gap-6 flex-wrap w-full">
      <Content className="w-full xl:flex-[7]">
        <VideoWrapper className="mb-4 h-[720px] animate-pulse"></VideoWrapper>

        <Body>
          <Title className="mb-3 h-[50px] w-full animate-pulse"></Title>

          <Details className="flex flex-col sm:flex-row gap-x-2 gap-y-4">
            <div className="flex items-center gap-x-2 w-[50%]">
              <DetailsImage className="w-10 h-10 rounded-full" />
              <UserInfo className="flex flex-col gap-y-1 w-full">
                <ChannelName className="h-[20px] animate-pulse"></ChannelName>
                <Info className="h-[16px] animate-pulse w-[80%]"></Info>
              </UserInfo>
            </div>
            <Buttons className="sm:ml-auto flex items-center gap-2 flex-wrap">
              <Button className="btn-rounded flex items-center gap-x-1 h-[30px] w-[50px]"></Button>
              <Button className="btn-rounded flex items-center gap-x-1 h-[30px] w-[50px]"></Button>
              <Button className="btn-rounded flex items-center gap-x- h-[30px] w-[50px]"></Button>
              <Button className="btn-rounded flex items-center gap-x-1 h-[30px] w-[50px]"></Button>
            </Buttons>
          </Details>

          <Hr />

          <DescriptionContent className="flex flex-col gap-y-2 h-[100px] my-4 p-3 rounded">
          </DescriptionContent>

          <AddCommentWrapper className="flex gap-x-2 items-center">
            <DetailsImage className="w-10 h-10 rounded-full" />
            <Hr className="w-full" />
          </AddCommentWrapper>
        </Body>
      </Content>
      <Recommendation className="w-full xl:flex-[3]">
        {[...Array(20).keys()].map((video, i) => (
          <LoaderCard type="sm" key={i} />
        ))}
      </Recommendation> 
    </Container>
  );
};

export default LoaderVideoContent;

const Container = styled.div``
const Content = styled.aside``;
const VideoWrapper = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const Body = styled.div``;
const Title = styled.h2`
  background: ${({ theme }) => theme.soft};
`;
const Details = styled.div``;
const UserInfo = styled.div`

`;
const DetailsImage = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const ChannelName = styled.p`
  background: ${({ theme }) => theme.soft};
`;
const Info = styled.p`
  background: ${({ theme }) => theme.soft};
`;
const DescriptionContent = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const Buttons = styled.div``;
const Button = styled.div`
  background: ${({ theme }) => theme.soft};
`;
const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const AddCommentWrapper = styled.div``;

const Recommendation = styled.aside``;
