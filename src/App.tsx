import { AuthContextProvider } from "context/auth/authProvider";
import { LoadingContextProvider } from "context/loading";
import { AppRouter } from "routers";

function App() {

  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </LoadingContextProvider>
  )
}

export default App
