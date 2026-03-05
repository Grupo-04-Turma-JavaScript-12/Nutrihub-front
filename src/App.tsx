import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import ListaCategoria from "./components/categoria/listacategoria/ListaCategoria";


function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/editarcategoria/:id" element={<FormCategoria />} />
        <Route path="/categorias" element={<ListaCategoria />} />
        <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
        {/* <h1 className="text-8xl text-amber-900">DEIXAR COMO ESTAVA</h1> */}
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
