import React, { useEffect, useState } from 'react';
import Card from '../Card';
import Footer from '../Footer';
import Navbar from '../Navbar';
//import Carousel from '../Carousel'; // Ensure you have a Carousel component
const fet = process.env.REACT_APP_FET;

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch(fet, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`${fet}`);
      if (!response.ok) throw new Error('Network response was not ok');
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Failed to fetch food items:', error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "#C9DABF" }}>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="6000">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://miro.medium.com/v2/resize:fit:1200/1*SUUpYS0fxIuS5-oB6ZCYIg.jpeg" className="d-block w-100" style={{ filter: "brightness(50%)", height: "25%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://c9admin.cottage9.com/uploads/2093/The-Art-Of-Making-Madhubani-Paintings.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://blogs.penkraft.in/wp-content/uploads/2020/11/how-did-Madhubani-painting-became-famous.jpg" className="d-block w-100" style={{ filter: "brightness(50%)", height: "50%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container">
          {foodCat.length > 0 ? (
            foodCat.map((data) => (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3" style={{ color: "#C40C0C" }}>
                  {data.CategoryName}
                </div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
                {foodItems.length > 0 ? (
                  foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase()))
                  ).map(filterItems => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                        foodName={filterItems.name} 
                        item={filterItems} 
                        options={filterItems.options[0]} 
                        ImgSrc={filterItems.img} 
                      />
                    </div>
                  ))
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            ))
          ) : null}
        </div>
        <Footer />
      </div>
    </div>
  );
}
