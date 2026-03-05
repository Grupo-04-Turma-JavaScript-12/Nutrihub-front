import { createContext, useState, type ReactNode } from "react"
import { ToastAlerta } from "../utils/ToastAlerta"
import type { RestauranteLogin } from "../models/RestauranteLogin"
import { login } from "../services/Service"

interface AuthContextProps {
    restaurante: RestauranteLogin
    handleLogout(): void
    handleLogin (restaurante: RestauranteLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [restaurante, setUsuario] = useState<RestauranteLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(restauranteLogin: RestauranteLogin) {
        setIsLoading(true)

        try {
            await login(`/usuarios/logar`, restauranteLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do usuário estão inconsistentes!", "erro")
         }
            setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ restaurante, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}