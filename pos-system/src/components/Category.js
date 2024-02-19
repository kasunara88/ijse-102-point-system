import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NevBar from "./NevBar";

const Category = () => {
  const [category, setCategory] = useState(null);
  const [categoryname, setName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const param = useParams();

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/categories/${param.id}`
      );
      console.log("Received data:", response.data);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

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

  const handleName = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    getCategory();
    getAllCategory();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      categoryName: categoryname,
    };
    await axios
      .post("http://localhost:8080/categories", data)
      .then((response) => {
        //console.log("Received data:", response.data);
        setCategory(response.data);
        window.alert("Category created successfully!");
        getAllCategory();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/categories/${id}`)
      .then((response) => {
        console.log("Received data:", response);
        // getAllCategory();
        alert("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = async (id) => {
    const data = {
      categoryName: categoryname,
    };

    await axios
      .put(`http://localhost:8080/categories/${id}`, data)
      .then((response) => {
        window.alert("Category updated successfully!");
        getAllCategory();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <NevBar />
      <div className="container-fluid">
        <div>
          <h2>Category Manage</h2>

          <form className="p-3 justify-content-start" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="row mb-3">
                <label for="categoryName" className="col-sm-2 col-form-label">
                  Category Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    className="form-control w-25"
                    placeholder="Name"
                    required
                    onChange={handleName}
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content">
                <div>
                  <button className="btn btn-primary text-end" type="submit">
                    Add New Category
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Category Table</h3>
          <table className="table table-success table-striped text-center">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th colspan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allCategory &&
                allCategory.map((category) => (
                  <tr key={category.itemCategoryId}>
                    <td>{category.itemCategoryId}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <button
                        className="btn btn-success text-end"
                        onClick={() => handleEdit(category.itemCategoryId)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger text-end"
                        onClick={() => handleDelete(category.itemCategoryId)}
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
export default Category;
