import { createSlice, } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean;
}
const initialState: AuthState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    login: (state) => {
      state.isLoggedIn = true
    },

    logout: () => initialState

  }
});

export const { login, logout} = authSlice.actions

export default authSlice.reducer