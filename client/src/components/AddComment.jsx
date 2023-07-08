import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../images/avatar.png";
import styled from "styled-components/macro";
import { useMutation } from "@tanstack/react-query";
import { API } from "../utils";

const createComment = async (commentData) => {
  const {data} = await API.post(`/api/comments/create`, commentData);
  return data.data;
}

const AddComment = ({ video }) => {
  const { user: currentUser } = useSelector((state) => state.user);
  const [desc, setDesc] = useState("");
  const {isLoading, mutate} = useMutation({
    mutationKey : ["comments", "create"],
    mutationFn : (commentData) => createComment(commentData),
    onSuccess : () => {
      setDesc("");
    }
  })

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!desc) return;
    mutate({desc, videoId : video?._id});
  }


  return (
    <AddCommentWrapper className="flex gap-x-2 items-center">
      <DetailsImage
        src={currentUser?.imgUrl || Avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <Input
        type="text"
        placeholder="Add a Comment..."
        className="h-[40px] px-4 w-full bg-transparent outline-none"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        required
      />
      <Button className="btn" onClick={handleCreateComment} disabled={!desc}>{isLoading ? "Adding..." : "Add"}</Button>
    </AddCommentWrapper>
  );
};

export default AddComment;

const DetailsImage = styled.img``;

const AddCommentWrapper = styled.div``;
const Input = styled.input`
  border-bottom: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;
const Button = styled.button``
