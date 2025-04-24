import { useState } from "react"
import { LoadingContext } from "./loadingContext";
import { Spin } from "antd";

type LoadingContextProvider = {
  children: React.ReactNode
}

export const LoadingContextProvider = ({ children }: LoadingContextProvider) => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <LoadingContext.Provider value={{
      loading,
      setLoading
    }}>
      <Spin size="large" spinning={loading}>
        {children}
      </Spin>
    </LoadingContext.Provider>
  )
}