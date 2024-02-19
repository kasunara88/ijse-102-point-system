import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import NevBar from "./NevBar";


const Item = () => {
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [allItem, setAllItem] = useState([]);

  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  
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

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

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
    getItem();
    gettAllItem();
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
        category_Id: categoryId
    };
  
   await axios
      .post("http://localhost:8080/items", data)
      .then((response) => {
        // console.log("Received data:", response.data);
        setItem(response.data);
        window.alert("Item created successfully!");
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/items/${id}`)
      .then((response) => {
        //console.log("Received data:", response);
        gettAllItem();
        alert("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = async (id) => {
    const data = { 
      name: itemName,
      brand: brand,
      unit: unit,
      qty: qty,
      price: price,
      // category_Id: categoryId
  };

    await axios
      .put(`http://localhost:8080/items/${id}`, data)
      .then((response) => {
        window.alert("Category updated successfully!");
        gettAllItem();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
    <NevBar/>
    <div>
      <div>
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
              placeholder="Item Name"
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
              placeholder="Brand Name"
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
              placeholder="Unit"
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
              placeholder="Quantity"
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
              placeholder="Price"
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
              {categories && categories.map((category) => (
                <option key={category.itemCategoryId} value={category.itemCategoryId}>
                  {category.categoryName}
                </option>
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
      </div>
      <div className="col-md-6">
      <h3>Item Table</h3>
          <table className="table table-success table-striped text-center">
            <thead>
              <tr>
                <th>Item Id</th>
                {/* <th>Category Id</th> */}
                <th>Name</th>
                <th>Brand</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Price</th>
                <th colspan="2">Action</th>
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
                    <td>
                      <button
                        className="btn btn-success text-end"
                        onClick={() => handleEdit(items.itemId)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger text-end"
                        onClick={() => handleDelete(items.itemId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
      </div>
    </>
  );
};

export default Item;
