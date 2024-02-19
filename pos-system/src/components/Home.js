import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import NevBar from "./NevBar";

const Home = () => {
  const [item, setItem] = useState([]);

  const getItem = () => {
    fetch ("http://localhost:8080/items")
       .then((response) => {
         return response.json();
       })
       .then((data) => {
         setItem(data);
       })
       .catch((error) => {
         console.log(error);
       })
       }

       useEffect(() => {
        getItem();
    
      },[]);
  return (
    <>

      <NevBar/>
      
      <div>
        <h1>Item List</h1>
        <div>
          <button onClick={getItem} className="btn btn-primary">Get Item</button>
          <ol>
         
          {item && item.map(()=>(
           <li>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
            </li>
          ))}

          </ol>
         
        
        </div>
      </div>
    </>
  );
};
export default Home;
