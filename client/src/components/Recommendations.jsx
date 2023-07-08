import React from "react";
import styled from "styled-components/macro";

import VideoCard from "../components/VideoCard";
import { useQuery } from "@tanstack/react-query";
import LoaderCard from "../components/Loaders/LoaderCard";
import { API } from "../utils";

const fetchVideos = async (tags) => {
  const resp = await API.get(`/api/videos/tags?tags=${tags}`);
  const data = await resp.data.data;
  return data;
};

// filter video by video tags

const Recommendations = ({video}) => {
  const tags = video.tags.join();
  const { isLoading, data: videos } = useQuery({
    enabled : tags != null,
    queryKey: ["videos", "tags", `${tags}`],
    queryFn: () => fetchVideos(tags),
  });

  return (
    <Recommendation className="w-full xl:flex-[3]">
      {isLoading
        ? [...Array(20).keys()].map((_, i) => <LoaderCard type="sm" key={i} />)
        : videos?.map((video) => (
            <VideoCard type="sm" video={video} key={video?._id} />
          ))}
    </Recommendation>
  );
};

const Recommendation = styled.aside``;

export default Recommendations;
