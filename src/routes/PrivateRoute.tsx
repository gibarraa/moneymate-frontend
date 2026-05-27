import { type PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/routes/RouterProvider";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
