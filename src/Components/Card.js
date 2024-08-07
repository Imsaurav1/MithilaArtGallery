import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const dispatch = useDispatchCart();

  // Handle quantity change
  const handleQty = (e) => {
    setQty(e.target.value);
  };

  // Handle size change
  // const handleOptions = (e) => {
  //   setSize(e.target.value);
  // };

  // Add item to cart
  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    let existingItem = data.find(item => item.id === props.item._id);

    if (existingItem) {
      if (existingItem.size === size) {
        await dispatch({ type: "UPDATE", id: props.item._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
    }

    await dispatch({ type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
  };

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  let finalPrice = qty * parseInt(props.options[size] || 0, 10);

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20  text-black rounded" value={qty} onChange={handleQty}  style={{backgroundColor: '#FFB22C'}}>
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 w-20  text-black rounded" style={{backgroundColor: '#FFB22C'}} ref={priceRef} value={size} >
              {Object.keys(props.options).map(option => (
                <option key={option} value={option}></option>
              ))}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}style={{backgroundColor: '#FFB22C'}} >Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
