import styled from "styled-components/macro";
import VideoCard from "../components/VideoCard";
import { useQuery } from "@tanstack/react-query";
import LoaderCard from "../components/Loaders/LoaderCard";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import { API } from "../utils";

const fetchVideos = async (type) => {
  const {data} = await API.get(`/api/videos/${type}`);
  return data.data;
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("type") || "random";

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    enabled: params != null,
    queryKey: [`videos?type=${params}`],
    queryFn: () => fetchVideos(params),
  });

  if (isLoading)
    return (
      <Container className="flex flex-wrap gap-y-4">
        {[...Array(20).keys()].map((i) => (
          <LoaderCard key={i} />
        ))}
      </Container>
    );
  if (error) {
    <Error error={error} />;
  }

  return (
    <Container className="flex flex-wrap gap-y-4">
      {videos?.length === 0 ? (
        <Wrapper className="w-full max-w-280 py-4 mx-auto my-6 text-center rounded-sm">
          <h2 className="text-xl my-4">No Videos to show</h2>
          <Text className="">please create a video</Text>
        </Wrapper>
      ) : (
        videos?.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </Container>
  );
};

export default Home;

const Container = styled.section``;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.soft};
`;
const Text = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
