import React from "react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";



const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    searchTerm.length < 2 ? navigate("/") : navigate(`/search?query=${e.target.value}`);
  }
  
  return (
    <Container className="relative h-[35px] w-full max-w-[400px] rounded overflow-hidden outline-none">
      <Input
        placeholder="Search..."
        className="h-full px-4 w-full bg-transparent outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="outline-none border-none flex_center bg-transparent w-[40px] absolute right-1 transform -translate-y-1/2 top-1/2">
        <MdSearch
          size={24}
        />
      </button>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  border-bottom: 1px;
  border-right: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;

const Input = styled.input``;
