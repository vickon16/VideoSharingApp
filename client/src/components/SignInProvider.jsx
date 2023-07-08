import React from "react";
import styled from "styled-components/macro";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch} from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

const signInWithGoogle = async () => {
  const response = await signInWithPopup(auth, provider);
  if (!response?.user) return;

  const {data} = await API.post("/api/auth/google", {
    name: response.user.displayName,
    email: response.user.email,
    img: response.user.photoURL,
  });

  return data
};

const SignInProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey : ["signin", "google"],
    mutationFn: () => signInWithGoogle(),
    onSuccess : (data) => {
      dispatch(loginUser(data.data));
      navigate("/");
    }
  });

  
  return (
    <Container>
      <Button
        className="flex items-center gap-x-2 btn-plain"
        onClick={mutate}
      >
        <FcGoogle />
        Google Sign In
      </Button>
    </Container>
  );
};

export default SignInProvider;

const Container = styled.div``;

const Button = styled.button`
  background-color: ${({ theme }) => theme.soft};

  &:hover {
    background-color: ${({ theme }) => theme.soft2};
  }
`;
