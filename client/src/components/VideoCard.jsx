import React from "react";
import styled from "styled-components/macro";
import YoutubeImage from "../images/youtube-image.jpg";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoaderCardDetails from "./Loaders/LoaderCardDetails";
import { API, timeAgo } from "../utils";

const fetchUserChannel = async (userId) => {
  const resp = await API.get(`/api/users/find/${userId}`);
  const data = await resp.data.data;
  return data;
};

const VideoCard = ({ type, video }) => {
  const { isLoading, data: user } = useQuery({
    queryKey: [`users/find/${video.userId}`],
    queryFn: () => fetchUserChannel(video.userId),
  });

  return (
    <Container
      className={`${
        type === "sm"
          ? "flex gap-3 flex-wrap"
          : "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[250px]"
      } w-full shadow-md hover:shadow-lg py-4 px-2 rounded `}
    >
      <ImageLink
        to={`/videos/${video?._id}`}
        className={`${
          type === "sm" ? "h-[110px] w-2/6" : "w-full h-[200px]"
        } block cursor-pointer`}
      >
        <Image
          className={`w-full h-full object-cover rounded`}
          src={video?.imgUrl || YoutubeImage}
          alt={video.title}
        />
      </ImageLink>

      {isLoading ? (
        <div>
          <LoaderCardDetails />
        </div>
      ) : (
        <Details
          className={`flex ${
            type === "sm" ? " min-w-[120px] w-3/6" : "mt-4"
          } gap-x-2`}
        >
          <DetailsImage
            src={user?.imgUrl || Avatar}
            alt="avatar"
            className={`${type === "sm" ? "hidden" : ""}  w-6 h-6 rounded-full cursor-pointer`}
          />
          <div className="flex flex-col gap-y-2">
            <Title>{video.title}</Title>
            <ChannelName className="line-clamp-1 text-xs lowercase">
              {user.name}
            </ChannelName>
            <Desc className="line-clamp-2 text-sm">{video.desc}</Desc>
            <Info className="line-clamp-2 text-xs">
              {video.views} views &bull; {timeAgo(video?.createdAt)}
            </Info>
          </div>
        </Details>
      )}
    </Container>
  );
};

export default VideoCard;

const Container = styled.div``;
const Image = styled.img``;
const ImageLink = styled(Link)``;
const Details = styled.div``;
const Desc = styled.article``;
const DetailsImage = styled.img``;
const Title = styled.h3``;
const ChannelName = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
const Info = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
