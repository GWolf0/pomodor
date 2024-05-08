import AppContextProvider from "./Contexts/appContext";
import MainPage from "./Pages/MainPage"


function App(){

  return (
    <AppContextProvider>
      <MainPage />
    </AppContextProvider>
  )
}

export default App;
