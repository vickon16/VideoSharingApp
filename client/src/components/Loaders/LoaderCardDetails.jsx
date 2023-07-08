import styled from "styled-components/macro";
import React from "react";

const LoaderCardDetails = ({min}) => {
  return (
    <Details
      className={`flex flex-1 min-w-[120px] min-h-[80px] sm:flex-[0.8] gap-x-2 mt-4`}
    >
      <DetailsImage className={`w-6 h-6 rounded-full`} />
      <div className="flex flex-col gap-y-2 w-full">
        <Title className="p-2 w-[50%]"></Title>
        <ChannelName className="w-[80%] p-2 animate-pulse"></ChannelName>
        {!min && <Info className="w-[40%] p-2"></Info>}
      </div>
    </Details>
  );
};

export default LoaderCardDetails;


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
