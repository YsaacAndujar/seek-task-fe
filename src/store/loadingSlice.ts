import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice, } from '@reduxjs/toolkit'

interface LoadingState {
    loading: boolean;
}
const initialState: LoadingState = {
    loading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
});

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer