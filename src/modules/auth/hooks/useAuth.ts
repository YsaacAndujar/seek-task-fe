import axios from "axios"
import { AuthContext } from "context/auth"
import { LoadingContext } from "context/loading"
import { postLogin, postSignin } from "helpers/auth"
import { useContext } from "react"

export const useAuth = () => {
    const { setIsLogged } = useContext(AuthContext)
    const { setLoading } = useContext(LoadingContext)
    const login = ({ remember, token }: { remember: boolean, token: string }) => {
        if (remember) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }
        axios.defaults.headers.Authorization = `Bearer ${token}`
        setIsLogged(true)
    }
    const startLogin = ({ email, password, remember }: { email: string, password: string, remember: boolean }) => {
        setLoading(true)
        postLogin({ email, password, })
            .then(({ token }) => {
                login({ remember, token })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const startSignin = ({ email, password }: { email: string, password: string }) => {
        setLoading(true)
        postSignin({ email, password, })
            .then(({ token }) => {
                login({ remember: false, token })
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return { startLogin, startSignin, login }
}