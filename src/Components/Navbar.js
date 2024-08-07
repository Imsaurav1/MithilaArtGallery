import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "./screens/Carts";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let navigate = useNavigate();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark  position-sticky" 
        style={{
          boxShadow: "0px 10px 20px black",
          position: "fixed",
          zIndex: 10,
          width: "100%",
          backgroundColor: "#F6E96B",
        }}
      >
        <div className="container-fluid">
        <Link 
            className="navbar-brand fs-1 fst-italic" 
            to="/" 
            style={{ 
              backgroundColor: '#F6E96B', 
              color: '#451952', 
              padding: '20px', 
              fontFamily: 'Arial, sans-serif'  // Change this to your desired font
            }}
          >
            Mithila Art Gallery
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/"

                  style={{ 
                    //backgroundColor: '#F6E96B', 
                    color: '#451952', 
                    padding: '20px', 
                      // Change this to your desired font
                  }}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("data") && (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3"
                    aria-current="page"
                    to="/myorder"

                    style={{ 
                      //backgroundColor: '#F6E96B', 
                      color: '#451952', 
                      padding: '10px', 
                        // Change this to your desired font
                    }}
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("data") ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={loadCart}
                >
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <button
                  onClick={handleLogout}
                  className="btn bg-white text-success ms-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
