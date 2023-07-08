import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import {loginUser} from "../redux/userSlice";
import {useDispatch} from  "react-redux"
import { API } from "../utils";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignUpUser = () => {
  const [signUpState, setSignUpState] = useState(initialState);
  const dispatch = useDispatch();

  const { isError, error, data, mutate, isLoading } = useMutation({
    mutationKey : ["signup", "email-password"],
    mutationFn: (formState) => {
      return API.post("/api/auth/signup", formState);
    },
    onSuccess: () => {
      dispatch(loginUser(data.data));
      setSignUpState(initialState);
      navigate("/");
    },
  });

  const navigate = useNavigate();

  const disableSignUp =
    signUpState.email === "" ||
    signUpState.password === "" ||
    signUpState.name === "";

  return (
    <>
      <Title className="text-xl font-semibold">SignUp</Title>

      <Input
        type="text"
        autoComplete="off"
        placeholder="UserName..."
        value={signUpState.name}
        onChange={(e) =>
          setSignUpState((prev) => ({ ...prev, name: e.target.value }))
        }
        required
      />
      <Input
        type="email"
        autoComplete="off"
        placeholder="Email..."
        value={signUpState.email}
        onChange={(e) =>
          setSignUpState((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <Input
        type="password"
        autoComplete="new-password"
        placeholder="Password..."
        value={signUpState.password}
        onChange={(e) =>
          setSignUpState((prev) => ({ ...prev, password: e.target.value }))
        }
        required
      />
      <Button
        className="btn"
        disabled={disableSignUp}
        onClick={() => mutate(signUpState)}
      >
        {isLoading ? "Signin up..." : "Sign Up"}
      </Button>

      {isError && (
        <p className="text-red-500 mt-1">
          {error.response.data.message || error.message}
        </p>
      )}
    </>
  );
};

export default SignUpUser;

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
