import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Contato from "./pages/contato/Contato";
import Home from "./pages/Home/Home";
import Servicos from "./pages/servicos/Servicos";
import Sobrenos from "./pages/sobrenos/Sobrenos";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Home />
          <Servicos />
          <Sobrenos />
          <Contato />
        </main>
        {/* <h1 className="text-8xl text-amber-900">DEIXAR COMO ESTAVA</h1> */}
        <Footer />
      </div>
    </>
  );
}

export default App;
