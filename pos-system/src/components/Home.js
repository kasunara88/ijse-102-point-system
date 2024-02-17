import { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [category, setCatgory] = useState(null);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCategory();
  }, []);

const getCategory = async () =>{
  try {
    const response = await axios.get("http://localhost:8080/categories");
    setCatgory(response.data);
    console.log(response.data);
  } catch (error) {
    if(error.response ===401){
      navigate("/login");
    }
  }
}

const getItem = async () =>{
  try {
    const response = await axios.get("http://localhost:8080/items");
    setItem(response.data);
    console.log(response.data);
  } catch (error) {
    if(error.response ===401){
      navigate("/login");
    }
  }
}


  return (
    <>
      <nav class="navbar navbar-expand-lg bg-secondary-subtle">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Home
          </a>       
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav">

            </ul>
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a class="nav-link" href="category">
                Category
              </a>
              <a class="nav-link" href="/item">
                Items
              </a>  
            </div>
          </div>
        </div>
        <div class="justify p-3">
              <a class="nav-link" href="/login">Login</a>
              </div>
      </nav>
      
      <button className="btn btn-primary" onClick={getItem} >Load Item</button>
      <ol>
        {item && item.map((item) => (
          <li> <Link to={`/items/${item.id}`}>{item.name}</Link></li>
        ))}
      </ol>
    </>
  );
};
export default Home;
