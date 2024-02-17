import {useNavigate, Outlet} from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
   const token = localStorage.getItem("token");

   const navigate = useNavigate;

   if(!token){
    navigate("/login")
   }

   axios.defaults.headers.common[`Authorization`] = `Bearer ${token}` ;
   return <Outlet/>

}

export default ProtectedRoutes;