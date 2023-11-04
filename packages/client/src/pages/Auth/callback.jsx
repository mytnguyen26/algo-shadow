import { useAuth } from "../../context/auth.context.jsx";
import { CircularProgress, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paths } from "../../constants/Paths.js";

export const Callback = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      navigate(Paths.HOME);
    }
  }, [token]);

  return (
    <Stack
      spacing={4}
      sx={{
        mt: 10,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={64} />
    </Stack>
  );
};
