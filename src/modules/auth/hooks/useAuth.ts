import axios from "axios"
import { postLogin, postSignin } from "helpers/auth"
import { useAppDispatch } from "store"
import { login as dispatchLogin } from 'store/authSlice';
import { setLoading } from "store/loadingSlice";

export const useAuth = () => {
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
        dispatch(setLoading(true))
        postLogin({ email, password, })
            .then(({ token }) => {
                login({ remember, token })
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }

    const startSignin = ({ email, password }: { email: string, password: string }) => {
        dispatch(setLoading(true))
        postSignin({ email, password, })
            .then(({ token }) => {
                login({ remember: false, token })
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
    return { startLogin, startSignin, login }
}