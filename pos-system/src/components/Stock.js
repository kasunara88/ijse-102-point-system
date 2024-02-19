import NevBar from "./NevBar";
import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import StockCell from "./StockCell";
import axios from "axios";

const Stock = () => {
    const [stock, setStock] = useState([]);
    const [item, setItem] = useState(null);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState('');
  
    const getStock = async () => {
        const response = await axios.get("http://localhost:8080/stock");
        setStock(response.data);
        console.log(response.data);
    }

    const getItem = async () => {
        try {
         const response = await axios.get(
           "http://localhost:8080/items"
         );
         setItem(response.data);
         //console.log(response.data);
        } catch (error) {
         console.error("Eror fetching Items", error)
        }
       }

    const getCategory = async() =>{
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategory(response.data);
        } catch (error) {
            console.error("Eror fetching Category", error)
        }
        
    }

    useEffect(() => {
      getStock();
      getItem();
      getCategory();
    }, []);
  
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
    };

    // const filteredStock = stock.filter((item) =>
    //   item.name.toLowerCase().includes(search.toLowerCase()) ||
    //   item.category.toLowerCase().includes(search.toLowerCase())
    // );

  
 
  
    const handleStockChange = (item, quantity) => {
      setStock((prevStock) =>
        prevStock.map((i) => (i.itemId === item.itemId ? { ...i, quantity } : i))
      );
  
    };
  


  return (
    <>
      <NevBar />
      <div className="stock-page">
        <h1>Stock Management</h1>
        <Form.Control
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={handleSearchChange}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {item && category && item.map((items) => (
              <tr key={items.itemId}>
                <td>{items.name}</td>
                <td>{items.price}</td>
                <td>{items.category_id}</td>
                
                <td>
                  <StockCell item={items} onChange={handleStockChange} />
                </td>
              </tr>
            ))}
         
            
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Stock;
