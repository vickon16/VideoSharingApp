import React from "react";
import styled from "styled-components/macro";

import LoaderComment from "./Loaders/LoaderComment";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { API } from "../utils";

const fetchComments = async (videoId) => {
  const { data } = await API.get(`/api/comments/find/${videoId}`);
  return data.data;
};

const Comments = ({ video }) => {
  const { isLoading, data: comments } = useQuery({
    enabled: video?._id != null,
    queryKey: ["videos", `${video?._id}`, "comments"],
    queryFn: () => fetchComments(video?._id),
  });

  return (
    <CommentSection className="flex flex-col gap-y-4 mt-8">
      {isLoading ? (
        [...Array(5).keys()].map((_, i) => <LoaderComment key={i} />)
      ) : comments?.length === 0 ? (
        <NoComment className="text-center my-5">Sorry, There are no comments to display yet!...</NoComment>
      ) : (
        comments?.map((comment) => (
          <Comment key={comment?._id} comment={comment} video={video}/>
        ))
      )}
    </CommentSection>
  );
};

export default Comments;

const CommentSection = styled.section``;

const NoComment = styled.h2`
  color: ${({ theme }) => theme.textSoft};
`;
