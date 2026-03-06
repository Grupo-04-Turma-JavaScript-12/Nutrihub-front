import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import ListaCategorias from "./components/categoria/listacategoria/ListaCategoria";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <div className="min-h-[80vh]">
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route
                path="/deletarcategoria/:id"
                element={<DeletarCategoria />}
              />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              {/* <h1 className="text-8xl text-amber-900">DEIXAR COMO ESTAVA</h1> */}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
