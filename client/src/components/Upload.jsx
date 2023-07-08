import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components/macro";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";
import {useNavigate} from "react-router-dom"
import {useMutation} from "@tanstack/react-query"
import { API } from "../utils";

const uploadFunction = async (inputs) => {
  const {data} = await API.post(`/api/videos/create`, inputs);
  return data.data
} 

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPercentage, setImgPercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {isLoading, mutate} = useMutation({
    mutationKey : ["videos", "create"],
    mutationFn: (inputs) => uploadFunction(inputs),
    onSuccess : (data) => {
      setOpen(false);
      navigate(`/videos/${data._id}`)
    },
    onError: (err) => {
      setError(err.response.data.message || err.message)
    }
  })

  const uploadFile = (file, urlType) => {
    if (!file) return;

    const fileName = new Date().getTime() + "_" + file.name;

    const storageRef = ref(
      storage,
      `${urlType === "imgUrl" ? `Images/${fileName}` : `Videos/${fileName}`}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        urlType === "imgUrl"
          ? setImgPercentage(progress)
          : setVideoPercentage(progress);
      },
      (error) => alert(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({
            ...prev,
            [urlType]: downloadURL,
          }));
          if (urlType === "imgUrl") {
            setImg(null);
            setImgPercentage(0);
          } else {
            setVideo(null)
            setVideoPercentage(0);
          }
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const {title, imgUrl, videoUrl, desc} = inputs
    if (!title || !imgUrl || !videoUrl || !desc) {
      setError("Please, Complete your information");
      return;
    }

    mutate(inputs);
  }

  useEffect(() => {
    if (!video) return;
    uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    if (!img) return;
    uploadFile(img, "imgUrl");
  }, [img]);

  return (
    <Container
      className="fixed w-full h-[100svh] inset-0 bg-black/50 z-[15] flex_center"
      onClick={() => setOpen(false)}
    >
      <Wrapper
        className="max-w-[600px] w-full p-5 flex flex-col gap-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Close
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <MdClose />
        </Close>

        <Title className="text-center text-xl mt-8 mb-4 font-semibold capitalize">
          Upload a New Video
        </Title>

        <Label className="text-sm font-semibold">Video* </Label>
        <FileWrapper className="flex items-center gap-x-5 gap-y-3">
          <File
            type="file"
            className="h-[40px] w-fit px-4 bg-transparent outline-none cursor-pointer disabled:cursor-not-allowed"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            disabled={videoPercentage > 0 && videoPercentage < 100}
            required
          />
          {videoPercentage > 0 && videoPercentage < 100 && (
            <Percentage className="text-emerald-400 font-bold text-lg">
              {videoPercentage}%
            </Percentage>
          )}
        </FileWrapper>

        <Label className="text-sm font-semibold">Title* </Label>
        <Input
          type="text"
          placeholder="Title"
          className="h-[40px] px-4 w-full bg-transparent outline-none"
          name="title"
          onChange={handleChange}
          required
        />
        <Label className="text-sm font-semibold">Desc* </Label>
        <Desc
          placeholder="Description"
          className="p-4 w-full bg-transparent"
          rows={7}
          name="desc"
          onChange={handleChange}
          required
        />
        <Label className="text-sm font-semibold">Tags </Label>
        <Input
          type="text"
          placeholder="Seperate tags with commas. e.g py,c++"
          className="h-[40px] px-4 w-full bg-transparent outline-none placeholder:text-sm"
          name="tags"
          onChange={handleChange}
        />

        <Label className="text-sm font-semibold">Image* </Label>
        <FileWrapper className="flex items-center gap-x-5 gap-y-3">
          <File
            type="file"
            className="h-[40px] w-fit px-4 bg-transparent outline-none cursor-pointer disabled:cursor-not-allowed"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            disabled={imgPercentage > 0 && imgPercentage < 100}
            required
          />
          {imgPercentage > 0 && imgPercentage < 100 && (
            <Percentage className="text-emerald-400 font-bold text-lg">
              {imgPercentage}%
            </Percentage>
          )}
        </FileWrapper>

        {error && <Info className="text-red-500 text-sm">{error}</Info>}

        <Button className="btn mt-6" onClick={handleUpload}>
          {isLoading ? "Uploading" : "Upload"}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;

const Container = styled.section``;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const Title = styled.h1``;
const Close = styled.div``;
const Label = styled.label``;

const Input = styled.input`
  border-bottom: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;
const FileWrapper = styled.div``;
const File = styled.input`
  border-bottom: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;
const Percentage = styled.span``;
const Info = styled.p``;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;
const Button = styled.button``;
