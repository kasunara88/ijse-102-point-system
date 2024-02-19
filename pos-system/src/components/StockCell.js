import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const StockCell = ({item, onChange}) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [error, setError] = useState("");

    const handleIncrease = () =>{
        if(quantity < item.max){
            setQuantity(quantity + 1);
            onChange(item.id, quantity + 1);
        } else{
            setError("Stock is full");
        }
    }
    const handleDecrease = () =>{
        if(quantity > 0){
            setQuantity(quantity - 1);
            onChange(item.id, quantity - 1);
        } else{
            setError("Stock is empty");
        }

    }
    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= item.max) {
          setQuantity(e.target.value);
          onChange(item, e.target.value);
        }
    }

  return (
    <>
      <div className="stock-cell">
        <Button
          onClick={handleDecrease}
          variant="outline-secondary"
          disabled={quantity === 0}
        >
          -
        </Button>
        <Form.Control
          type="number"
          value={quantity}
          onChange={handleChange}
          className={error ? "is-invalid" : ""}
        />
        
        <Button
          onClick={handleIncrease}
          variant="outline-secondary"
          disabled={quantity === item.max}
        >
          +
        </Button>
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>

    </>
  );
};
export default StockCell;
