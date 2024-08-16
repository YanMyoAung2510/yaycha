import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../useApp";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";
export default function Login() {
  const navigate = useNavigate();

  const { setAuth } = useApp();

  const usernameInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    if (!username || !password) {
      setError("username and password required.");
      return false;
    }

    login.mutate({ username, password });
  };

  const login = useMutation(
    async ({ username, password }) => {
      return postLogin(username, password);
    },
    {
      onError: async () => setError("Incorrect username or password"),
      onSuccess: async (result) => {
        setAuth(result.user);
        localStorage.setItem("token", result.token);
        navigate("/");
      },
    }
  );

  // const login = useMutation(
  //   async ({ username, password }) => {
  //     return postLogin(username, password);
  //   },
  //   {
  //     onError: async () => {
  //       setError("Incorrect username or password");
  //     },
  //     onSuccess: async (result) => {
  //       setAuth(result.user);
  //       console.log(result.user);

  //       localStorage.setItem("token", result.token);
  //       navigate("/");
  //     },
  //   }
  // );

  return (
    <Box>
      <Typography variant="h3">Login</Typography>

      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField
            inputRef={usernameInput}
            placeholder="Username"
            fullWidth
          />
          <TextField
            inputRef={passwordInput}
            type="password"
            placeholder="Password"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
