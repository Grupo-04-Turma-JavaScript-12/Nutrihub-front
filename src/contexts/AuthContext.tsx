import { createContext, type ReactNode, useState } from "react";
import type { RestauranteLogin } from "../models/RestauranteLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  restaurante: RestauranteLogin;
  handleLogout(): void;
  handleLogin(usuario: RestauranteLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [restaurante, setRestaurante] = useState<RestauranteLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(restauranteLogin: RestauranteLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", restauranteLogin, setRestaurante);
      ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setRestaurante({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ restaurante, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
