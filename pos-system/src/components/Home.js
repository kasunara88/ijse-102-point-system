
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NevBar from "./NevBar";

export const Home = () => {
    const [category, setCategory] = useState(null);
    const [allCategory, setAllCategory] = useState([]);
    const [allItem, setAllItem] = useState([]);
    const param = useParams();
  
    const getCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/categories/${param.id}`
        );
        
        setCategory(response.data);
        console.log("Received data:", response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
  
    const getAllCategory = async () => {
      await axios
        .get("http://localhost:8080/categories")
        .then((response) => {
        console.log("Received data:", response.data);
          setAllCategory(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    const gettAllItem = async () => {
        await axios
          .get("http://localhost:8080/items")
          .then((response) => {
          console.log("Received data:", response.data);
            setAllItem(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
  
    useEffect(() => {
      getCategory();
      getAllCategory();
      gettAllItem();
    }, []);

  
    
  return (
    <div>
        <NevBar/>
        <div className="col-md-6">
          <h3>Category Table</h3>
          <table className="table table-success table-striped text-center">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                
              </tr>
            </thead>
            <tbody>
              {allCategory &&
                allCategory.map((category) => (
                  <tr key={category.itemCategoryId}>
                    <td>{category.itemCategoryId}</td>
                    <td>{category.categoryName}</td>
                
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
        <div className="col-md-6">
      <h3>Item Table</h3>
          <table className="table table-success table-striped text-center">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Price</th>
               
              </tr>
            </thead>
            <tbody>
              {allItem &&
                allItem.map((items) => (
                  <tr key={items.itemId}>
                    <td>{items.itemId}</td>
                    <td>{items.name}</td>
                    <td>{items.brand}</td>
                    <td>{items.unit}</td>
                    <td>{items.qty}</td>
                    <td>{items.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
        </div>
    </div>
  )
}
export default Home;
