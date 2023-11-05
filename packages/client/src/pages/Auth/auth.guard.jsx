import { useEffect } from "react";
import { useAuth } from "@context/auth.context";
import { Paths } from "@constants/paths";
import { Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { token, decoded_token, initialized } = useAuth();

  useEffect(() => {
    if (initialized && !token) {
      const loginUrl = `${import.meta.env.VITE_AUTH_CLIENT}?projectId=${
        import.meta.env.VITE_PROJECT_ID
      }&redirectUrl=${encodeURIComponent(
        window.location.origin + Paths.CALLBACK
      )}`;
      window.location.replace(loginUrl);
    }
  }, [initialized, token, decoded_token]);

  return <Outlet />;
};
