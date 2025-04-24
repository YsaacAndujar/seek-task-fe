import axios from "axios"
import { LoadingContext } from "context/loading"
import { postLogin, postSignin } from "helpers/auth"
import { useContext } from "react"
import { useAppDispatch } from "store"
import { login as dispatchLogin } from 'store/authSlice';

export const useAuth = () => {
    const { setLoading } = useContext(LoadingContext)
    const dispatch = useAppDispatch()
    const login = ({ remember, token }: { remember: boolean, token: string }) => {
        if (remember) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }
        axios.defaults.headers.Authorization = `Bearer ${token}`
        dispatch(dispatchLogin())
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