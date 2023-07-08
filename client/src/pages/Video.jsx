import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";
import LoaderVideoContent from "../components/Loaders/LoaderVideoContent";
import Recommendations from "../components/Recommendations";
import { setVideoData } from "../redux/videoSlice";
import { useDispatch, useSelector } from "react-redux";

import VideoDetails from "../components/VideoDetails";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import { API } from "../utils";

const fetchVideo = async (id) => {
  const { data } = await API.get(`/api/videos/find/${id}`);
  return data.data;
};

const Video = () => {
  const { id } = useParams();
  const { video } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const { isLoading, isFetching, isError, error } = useQuery({
    enabled: id != null,
    queryKey: ["videos", "find", `${id}`],
    queryFn: () => fetchVideo(id),
    onSuccess: (data) => {
      dispatch(setVideoData(data));
    },
  });

  if (isError) return <Error error={error} />;

  return (
    <Container className="flex gap-6 flex-wrap">
      {isLoading && isFetching ? (
        <LoaderVideoContent />
      ) : (
        <>
          <Content className="w-full xl:flex-[7]">
            <VideoWrapper className="mb-4">
              <iframe
                width="100%"
                height="720"
                src={video?.videoUrl}
                allowFullScreen
                title="Youtube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </VideoWrapper>

            <Body>
              <Title className="text-lg md:text-xl mb-3">{video?.title}</Title>

              <VideoDetails video={video} />

              <AddComment video={video} />

              {/* Comment section */}
              <Comments video={video} />
            </Body>
          </Content>
          <Recommendations video={video} />
        </>
      )}
    </Container>
  );
};

export default Video;

const Container = styled.section``;
const Content = styled.aside``;

const VideoWrapper = styled.div``;
const Body = styled.div``;
const Title = styled.h2``;


