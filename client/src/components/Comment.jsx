import React from "react";
import styled from "styled-components/macro";
import Avatar from "../images/avatar.png";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import LoaderComment from "./Loaders/LoaderComment";
import { API, timeAgo } from "../utils";

const fetchUser = async (userId) => {
  const resp = await API.get(`/api/users/find/${userId}`);
  const data = await resp.data.data;
  return data;
};

const Comment = ({comment, video}) => {
  const { isLoading, data: user } = useQuery({
    enabled : comment?.userId != null,
    queryKey: ["videos", `${video?._id}`, "comments", "user", `${comment?.userId}`],
    queryFn: () => fetchUser(comment?.userId),
  });

  if (isLoading) return <LoaderComment />


  return (
    <Container className="flex gap-x-2">
      <CommentImage
        src={user?.imgUrl || Avatar}
        alt="avatar"
        className="w-7 h-7 rounded-full"
      />
      <CommentDetails className="flex flex-col gap-y-2">
        <Info className="text-xs">
          {user?.name} <InfoSpan>{timeAgo(comment?.createdAt)}</InfoSpan>
        </Info>
        <CommentText className="text-sm">{comment?.desc}</CommentText>
        <Buttons className="flex items-center gap-1 flex-wrap">
          <Button className="btn-rounded flex items-center">
            <MdThumbUp /> 0
          </Button>
          <Button className="btn-rounded flex items-center">
            <MdThumbDown />
          </Button>

          <Reply className="btn-rounded flex items-center">Reply</Reply>
        </Buttons>
      </CommentDetails>
    </Container>
  );
};

export default Comment;

const Container = styled.div``;

const CommentImage = styled.img``;
const CommentText = styled.p``;
const CommentDetails = styled.div``;
const Info = styled.p``;
const InfoSpan = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div``;
const Button = styled.button`
  padding: 4px;
  color: ${({ theme }) => theme.textSoft};
`;
const Reply = styled.span``;
