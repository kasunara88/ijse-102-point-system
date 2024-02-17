import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Item = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getItem = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItemName(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response === 401) {
        navigate("/login");
      }
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategory(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getCategory();
    getItem();
  }, []);

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
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: itemName,
      brand: brand,
      qty: qty,
      unit: unit,
      price: price,
      category: category,
    };
    fetch("http://localhost:8080/items", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItem([...item, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Items</h1>
        <ol>
          {item &&
            item.map((item) => (
              <li key={item.id}>
                {item.id} {item.name}
              </li>
            ))}
        </ol>
      </div>

      <form className="p-3 justify-content-start" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label for="name" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="name"
              id="name"
              class="form-control w-25"
              required
              onChange={handleItemName}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="brand" class="col-sm-2 col-form-label">
            Brand
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="brand"
              id="brand"
              class="form-control w-25"
              required
              onChange={handleBrand}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="unit" class="col-sm-2 col-form-label">
            Unit
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="unit"
              id="unit"
              class="form-control w-25"
              required
              onChange={handleUnit}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="quantity" class="col-sm-2 col-form-label">
            Quantity
          </label>
          <div class="col-sm-10">
            <input
              type="number"
              name="quantity"
              id="quantity"
              class="form-control w-25"
              required
              onChange={handleQty}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="price" class="col-sm-2 col-form-label">
            Price
          </label>
          <div class="col-sm-10">
            <input
              type="number"
              name="price"
              id="price"
              class="form-control w-25"
              required
              onChange={handlePrice}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="category" class="col-sm-2 col-form-label">
            Category
          </label>
          <div class="col-sm-10">
            <select required onChange={handleCategory}>
              <option>Please Select</option>
              {category &&
                category.map((category) => (
                  <option key={category.id}>{category.name}</option>
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
