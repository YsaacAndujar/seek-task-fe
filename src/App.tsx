import { Loading } from "components/Loading";
import { Provider } from "react-redux";
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from "routers";
import { store } from 'store';
const persistor = persistStore(store)

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          <Loading />
        </PersistGate>
      </Provider>
  )
}

export default App
