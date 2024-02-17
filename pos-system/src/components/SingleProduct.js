import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {

 const param = useParams();
  const[item,setItem] = useState(null);
  
  useEffect(()=>{
    getItemById();
  })

  const getItemById = () => {
    // fetch(`http://localhost:8080/items/${param.id}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setItem(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    axios.get(`http://localhost:8080/items/${param.id}`)
    .then((response) => {
      setItem(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return(
     <>
  {item &&
  <div>
    <h1>{item.name}</h1>
    <div>{item.brand}</div>
    <div>{item.unit}</div>
    <div>{item.price}</div>
    <div>{item.qty}</div>
  </div>
  
  }
  
  </>
  )
};
export default SingleProduct;
