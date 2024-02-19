import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import ProtectedRoutes from "./utill/ProtectedRoutes";
import Home from "./components/Home";
import Item from "./components/Item";
import Category from "./components/Category";
import SingleProduct from "./components/SingleProduct";
import NevBar from "./components/NevBar";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/nevbar" element={<NevBar/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route index element={<Home/>}/>
        <Route path="/item" element={<Item/>}/>
        <Route path="/items/:id" element={<SingleProduct/>}/>
        <Route path="/category" element={<Category/>}/>
        
        </Route>

        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
