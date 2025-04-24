import { useState } from "react"
import { AuthContext } from "./authContext"
import Swal from 'sweetalert2'

type AuthContextProvider = {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const [isLogged, setIsLogged] = useState<boolean>(!!token)
  const logOut = () =>{
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        setIsLogged(false)
      }
    });
    
  }
  return (
    <AuthContext.Provider value={{
      isLogged,
      setIsLogged,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}