import React from 'react';

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://m.media-amazon.com/images/I/71nauG-gjLL._AC_UF1000,1000_QL80_.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)", height: "75%" }} alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://m.media-amazon.com/images/I/91RyV1cQbFL._AC_UF1000,1000_QL80_.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", height: "75%" }} alt="Pastry" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://j3k5s6s3.rocketcdn.me/wp-content/uploads/2021/08/Madhubani-Anjali-08.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", height: "75%" }} alt="Barbeque" />
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
        </div>
    );
}