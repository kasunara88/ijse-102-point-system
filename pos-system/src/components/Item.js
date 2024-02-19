import React, { useEffect, useState } from "react";
import axios from "axios";
import NevBar from "./NevBar";

const Item = () => {
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  // const [category, setCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  
  const getAllCategory = async () => {
    await axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        // console.log("Received data:", response.data);
        setAllCategory(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllCategory();

  },[]);

  const handleItemName = (event) => {
    setItemName(event.target.value);
  };

  const handleBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  const handleUnit = (event) => {
    setUnit(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { 
        name: itemName,
        brand: brand,
        unit: unit,
        qty: qty,
        price: price,
        category: categoryId
    };
    console.log(data);
   await axios
      .post("http://localhost:8080/items", data)
      .then((response) => {
        console.log("Received data:", response.data);
        setItem(response.data);
        window.alert("Item created successfully!");
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  return (
    <>
    <NevBar/>
      <div>
        <h1>Item Manage</h1>
      </div>

      <form className="p-3 justify-content-start" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label for="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control w-25"
              required
              onChange={handleItemName}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="brand" className="col-sm-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="brand"
              id="brand"
              className="form-control w-25"
              required
              onChange={handleBrand}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="unit" className="col-sm-2 col-form-label">
            Unit
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="unit"
              id="unit"
              className="form-control w-25"
              required
              onChange={handleUnit}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="quantity" class="col-sm-2 col-form-label">
            Quantity
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="form-control w-25"
              required
              onChange={handleQty}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="price" class="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="price"
              id="price"
              className="form-control w-25"
              required
              onChange={handlePrice}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="category" class="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <select required onChange={handleCategory}>
              <option>Please Select</option>
              {allCategory &&           
                allCategory.map((categories) => (
                  
                  <option key={categories.itemCategoryId}>{categories.categoryName}</option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <button className="btn btn-primary " type="submit">
            Add New Item
          </button>
        </div>
        
      </form>
    </>
  );
};

export default Item;
