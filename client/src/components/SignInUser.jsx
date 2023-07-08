import { useMutation} from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import {loginUser} from "../redux/userSlice";
import {useDispatch} from  "react-redux"
import { API } from "../utils";

const initialState = {
  email: "",
  password: "",
};

const SignInUser = () => {
  const [signInState, setSignInState] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, error, mutate, isLoading } = useMutation({
    mutationKey : ["signin", "email-password"],
    mutationFn: (formState) => {
      return API.post("/api/auth/signin", formState);
    },
    onSuccess: ({data}) => {
      dispatch(loginUser(data.data));
      setSignInState(initialState);
      navigate("/");
    },
  });

  const disableSignIn = signInState.email === "" || signInState.password === "";

  return (
    <>
      <Title className="text-xl font-semibold">Sign In</Title>
      <Input
        type="email"
        autoComplete="off"
        placeholder="Email..."
        value={signInState.email}
        onChange={(e) =>
          setSignInState((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <Input
        type="password"
        autoComplete="new-password"
        placeholder="Password..."
        value={signInState.password}
        onChange={(e) =>
          setSignInState((prev) => ({ ...prev, password: e.target.value }))
        }
        required
      />
      <Button
        className="btn"
        disabled={!!disableSignIn}
        onClick={() => mutate(signInState)}
      >
        {isLoading ? "Signin in..." : "Sign in"}
      </Button>
      {isError && (
        <p className="text-red-500 mt-1">
          {error.response.data.message || error.message}
        </p>
      )}
    </>
  );
};

export default SignInUser;

const Title = styled.h1``;

const Input = styled.input`
  position: relative;
  height: 35px;
  width: 100%;
  border-radius: 3px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
  padding: 20px;
  background: transparent;
`;
const Button = styled.button`
  margin: 10px 0;
`;
