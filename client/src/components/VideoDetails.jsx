import React from "react";
import styled from "styled-components/macro";
import {
  MdAddTask,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdRemoveRedEye,
  MdReply,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import Avatar from "../images/avatar.png";
import { useQuery } from "@tanstack/react-query";
import LoaderCardDetails from "./Loaders/LoaderCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo, dislikeVideo } from "../redux/videoSlice";
import { subscribeToChannel, unSubscribeToChannel } from "../redux/userSlice";
import { API, timeAgo } from "../utils";

const fetchVideoChannel = async (id) => {
  const { data } = await API.get(`/api/users/find/${id}`);
  return data.data;
};

const VideoDetails = ({ video }) => {
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    isLoading,
    data: user,
    isError,
    error,
  } = useQuery({
    enabled: video?.userId != null,
    queryKey: ["users", `${video?.userId}`],
    queryFn: () => fetchVideoChannel(video?.userId),
  });

  if (isLoading) return <LoaderCardDetails />;

  if (isError) return <h2>{error.response.data.message || error.message}</h2>;

  const handleLike = async () => {
    await API.put(`/api/videos/like/${video?._id}`);
    dispatch(likeVideo(video?._id));
  };

  const handleDislike = async () => {
    await API.put(`/api/videos/dislike/${video?._id}`);
    dispatch(dislikeVideo(video?._id));
  };

  const handleSubscribe = async () => {
    await API.put(`/api/users/sub/${video?.userId}`)
    dispatch(subscribeToChannel(video?.userId));
  };

  const handleUnSubscribe = async () => {
    await API.put(`/api/users/unsub/${video?.userId}`)
    dispatch(unSubscribeToChannel(video?.userId));
  };

  return (
    <>
      <Details className="flex flex-col sm:flex-row gap-x-2 gap-y-4">
        <div className="flex items-center gap-x-2">
          <DetailsImage
            src={user?.imgUrl || Avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <UserInfo className="flex flex-col gap-y-1">
            <ChannelName className="line-clamp-1">{user?.name} </ChannelName>
            <Info className="line-clamp-2 text-xs">
              {user?.subscribers} subscribers &bull;{" "}
              {timeAgo(video?.createdAt)}
            </Info>
          </UserInfo>
        </div>
        <Buttons className="sm:ml-auto flex items-center gap-2 flex-wrap">
          <Button className="btn-rounded flex items-center gap-x-1 !cursor-default">
            <MdRemoveRedEye /> {video?.views}
          </Button>

          <Button
            className="btn-rounded flex items-center gap-x-1"
            onClick={handleLike}
            disabled={video?.likes?.includes(currentUser?._id)}
          >
            {currentUser && video?.likes?.includes(currentUser?._id) ? (
              <MdThumbUp />
            ) : (
              <MdOutlineThumbUp />
            )}
            {video?.likes.length}
          </Button>

          <Button
            className="btn-rounded flex items-center gap-x-1"
            onClick={handleDislike}
            disabled={video?.dislikes?.includes(currentUser?._id)}
          >
            {currentUser && video?.dislikes?.includes(currentUser?._id) ? (
              <MdThumbDown />
            ) : (
              <MdOutlineThumbDown />
            )}
            {video?.dislikes.length}
          </Button>

          <Button className="btn-rounded flex items-center gap-x-1">
            <MdReply /> Share
          </Button>
          <Button className="btn-rounded flex items-center gap-x-1">
            <MdAddTask /> Save
          </Button>
        </Buttons>
      </Details>
      <Hr />

      <DescriptionContent className="flex flex-col gap-y-2 my-4 p-3 rounded">
        <Description>{video?.desc}</Description>

        {currentUser?._id !== video?.userId && (
          <>
            {currentUser?.subscribedUsers?.includes(video?.userId) ? (
              <UnSubscribe
                className="bg-red-600 ml-auto px-3 py-1 rounded cursor-pointer hover:bg-red-600/80"
                onClick={handleUnSubscribe}
              >
                UnSubscribe
              </UnSubscribe>
            ) : (
              <Subscribe
                className="bg-red-600 ml-auto px-3 py-1 rounded cursor-pointer hover:bg-red-600/80"
                onClick={handleSubscribe}
              >
                Subscribe
              </Subscribe>
            )}
          </>
        )}

        <Info className="text-sm mt-4">Tags - {video?.tags.join(", ")}</Info>
      </DescriptionContent>
    </>
  );
};

export default VideoDetails;

const Info = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
const DetailsImage = styled.img``;
const Details = styled.div``;
const UserInfo = styled.div``;
const ChannelName = styled.p``;
const Buttons = styled.div``;
const Button = styled.button`
  background: ${({ theme }) => theme.soft};
`;
const DescriptionContent = styled.div`
  background: ${({ theme }) => theme.soft};

  &:hover {
    opacity: 0.8;
  }
`;
const Description = styled.p``;
const Subscribe = styled.button``;
const UnSubscribe = styled.button``;

const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
