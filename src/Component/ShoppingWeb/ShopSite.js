import React, { useState,useEffect } from "react";
import "./style.css";
import Menu from "./Api";
// import ShopCard from "./ShopCard";
// import Navbar from "./Navbar.js";


const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];



const ShopSite = () => {
  const [menuData, setMenuData] = useState(Menu);

  const [menuList, setMenuList] = useState(uniqueList);

  const [fake, setFake] = useState(Menu);

  useEffect(() => {
   fakestore();
  },[])

  const fakestore = async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    const jsonData= await res.json();
    setFake(jsonData);
  }

//   const uniqueList = [
//     ...new Set(
//       fake.map((curElem) => {
//         return curElem.category;
//       })
//     ),
//     "All",
//   ];

  const filterItem = (category) => {
    if (category === "All") {
      setFake(Menu);
      return;
    }

    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });

    setFake(updatedList);
  };

// recent code

// const filterItem = (category) => {
//     const updatedList = Menu.filter((curElem) =>{
//         return curElem.category === category
//     });
//     setFake(updatedList)
// }

  return (
    <>

      <nav className="navbar">
        <div className="btn-group">
          {menuList.map((curElem) => {
            return (
              <button
                className="btn-group__item" key ={curElem.id}
                onClick={() => filterItem(curElem)}>
                {curElem}
              </button>
            );
          })}

          {/* <button className= "btn-group__item" onClick={()=>filterItem("men's clothing")}>men</button>
          <button className= "btn-group__item" onClick={()=>filterItem("women's clothing")}>women</button>
          <button className= "btn-group__item" onClick={()=>filterItem("jewelery")}>jewelery</button>
          <button className= "btn-group__item" onClick={()=>filterItem("electronics")}>electronics</button> */}
          {/* <button className= "btn-group__item" onClick={()=>filterItem("jewelery")}>All</button> */}
        </div>
      </nav>

      {/* <ShopCard fake={fake}/> */}

      <section className="main-card--cointainer">

         {fake.map((curElem) => {
          const { id, title,price, category,description, image } = curElem;

          return (
            <>
              <div className="card-container" key={id}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{id}</span>
                    <span className="card-author subtle"> {category}</span>
                    <h6 className="card-title"> {title} </h6>
                    <span className="card-description subtle">
                      {description}
                    </span>
                    <div className="card-read">Price: {price}</div>
                  </div>
                  <img src={image} alt="images" className="card-media" />

                  <span className="card-tag  subtle">Order Now</span>
                </div>
              </div>
            </>
          );
            })}

      </section>
    </>
  );
};

export default ShopSite;