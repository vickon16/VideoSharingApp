import React from 'react'
import styled from 'styled-components';

const LoaderComment = () => {
  return (
    <Container className="flex gap-x-2">
      <CommentImage
        className="w-7 h-7 rounded-full animate-pulse"
      />
      <CommentDetails className="flex flex-col gap-y-2 w-full">
         <Info className="h-[13px] w-[20%]"></Info>
        <CommentText className="h-[25px] w-full animate-pulse"></CommentText>
        <Buttons className="flex items-center gap-1 flex-wrap">
          <Button className="btn-rounded h-[13px] w-[18px]">
            
          </Button>
          <Button className="btn-rounded h-[13px] w-[18px]">
            
          </Button>

          <Reply className="btn-rounded h-[13px] w-[18px]"></Reply>
        </Buttons>
      </CommentDetails>
    </Container>
  )
}

export default LoaderComment


const Container = styled.div``;
const CommentImage = styled.div`background: ${({ theme }) => theme.soft};`;
const CommentText = styled.p`
  background: ${({ theme }) => theme.soft};
`;
const CommentDetails = styled.div``;
const Info = styled.p`
  background: ${({ theme }) => theme.soft};
`;
const Buttons = styled.div``;
const Button = styled.button`
  background: ${({ theme }) => theme.soft};
`;
const Reply = styled.span` background: ${({ theme }) => theme.soft};`;