import React from 'react'
import styled from 'styled-components';
import LoaderCard from '../components/Loaders/LoaderCard';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Error from '../components/Error';
import VideoCard from '../components/VideoCard';
import { API } from '../utils';

const fetchVideos = async (query) => {
  const {data} = await API.get(`/api/videos/search?query=${query}`)
  return data.data;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const {isLoading, data : videos, error} = useQuery({
    enabled : query != null,
    queryKey : ["videos", "search", `${query}`],
    queryFn : () => fetchVideos(query),
  })

  if (isLoading)
    return (
      <Container className="flex flex-wrap gap-y-4">
        {[...Array(10).keys()].map((i) => (
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
  )
}

export default SearchPage


const Container = styled.section``;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.soft};
`;
const Text = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;