import { useState } from "react";
import { LoadingContext } from "./loadingContext";
import { Backdrop, CircularProgress } from "@mui/material";

type LoadingContextProviderProps = {
  children: React.ReactNode;
};

export const LoadingContextProvider = ({ children }: LoadingContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
