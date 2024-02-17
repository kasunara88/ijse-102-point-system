import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);

  const param = useParams();

  const getCategory = () => {
    fetch(`http://localhost:8080/categories/${param.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getItemByCategory = () => {
    fetch(`http://localhost:8080/categories/${param.id}/items`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
    getItemByCategory();
  }, []);

  return (
    <>
      {category && <h1>{category.name}</h1>}
      <ol>
        {item &&
          item.map((item) => (
            <li key={item.id}>
              <Link to={`items/${item.id}`}>{item.name}</Link>
            </li>
          ))}
      </ol>
    </>
  );
};
export default Category;
