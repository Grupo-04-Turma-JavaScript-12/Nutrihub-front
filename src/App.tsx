import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import ListaCategorias from "./components/categoria/listacategoria/ListaCategoria";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletarRefeicao from "./components/refeicao/deletarrefeicao/DeletarRefeicao";
import FormRefeicao from "./components/refeicao/formrefeicao/FormRefeicao";
import ListaRefeicao from "./components/refeicao/listarefeicao/ListaRefeicao";
import { AuthProvider } from "./contexts/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />

          {/* <Home />
          <Servicos />
          <Sobrenos />
          <ListarPlanos />
          <ListaEquipe />
          <Contato /> */}

          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route
                path="/deletarcategoria/:id"
                element={<DeletarCategoria />}
              />
              <Route path="/refeicoes" element={<ListaRefeicao />} />
              <Route path="/cadastrarrefeicao" element={<FormRefeicao />} />
              <Route path="/editarrefeicao/:id" element={<FormRefeicao />} />
              <Route
                path="/deletarrefeicao/:id"
                element={<DeletarRefeicao />}
              />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
