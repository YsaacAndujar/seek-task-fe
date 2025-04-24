import { LoadingContextProvider } from "context/loading";
import { Provider } from "react-redux";
import { AppRouter } from "routers";
import { store } from 'store'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store)

function App() {

  return (
    <LoadingContextProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />

      </PersistGate>
      </Provider>
    </LoadingContextProvider>
  )
}

export default App
