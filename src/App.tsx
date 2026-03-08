import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Perfil from "./pages/perfil/Perfil";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
