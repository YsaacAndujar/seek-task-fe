import { createContext, Dispatch, SetStateAction } from "react";

export interface ILoadingContextValues {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<ILoadingContextValues>({
    loading: false,
    setLoading: () => {}
})