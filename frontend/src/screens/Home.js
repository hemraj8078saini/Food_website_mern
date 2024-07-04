import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState(" ");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0],response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search  "
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    }}
                    style={{ color: "red" }}
                />
              </div>
            </div>
            <div className="carousel-item active h-30 w-100 " >
              <img
                // src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
                src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
                className="d-block  h-50 object-fit-contain"
                style={{
                  filter: "brightness(90%)", 
                }}
                alt="hllo"
              />
            </div>
            <div className="carousel-item  h-30 w-100">
              <img
                src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="d-block  h-50 object-fit-contain w-100 "
                style={{
                  filter: "brightness(90%)",
                }}
                alt="hello"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="d-block   h-50 object-fit-contain w-100"
                style={{
                  filter: "brightness(90%)",
                }}
                alt="hello"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          //chatgpt already solve this problem see history
          foodCat !== []
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItems !== [] ? (
                      foodItems
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className=" col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                // foodName={filterItems.name}
                                foodItem={filterItems}
                                // item={filterItems}
                                options={filterItems.options[0]}
                                // ImgSrc={filterItems.img}
                              ></Card>
                            </div>
                          );
                        })
                    ) : (
                      <div> no such data found</div>
                    )}
                  </div>
                );
              })
            : ""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
