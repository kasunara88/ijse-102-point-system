// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const dispatch = useDispatch();
// const token = useSelector((state) => state.token);
// const user = useSelector((state) => state.user);

// useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     if (storedToken && storedUser) {
//         dispatch({ type: "SET_TOKEN", payload: storedToken });
//         dispatch({ type: "SET_USER", payload: storedUser });
        
//     }
// },[dispatch]);

// const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // window.location.reload();
// }


// const Logout = () => {
//     {token && user && (
//     <div className="logout-button">
//         <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>      
//     </div>
//     )}
// }

// export default Logout;
