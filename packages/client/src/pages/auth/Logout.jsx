import { CircularProgress, Stack } from "@mui/material";
import { useAuth } from "../../context/auth.context.jsx";
import { useEffect } from "react";

export const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

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
