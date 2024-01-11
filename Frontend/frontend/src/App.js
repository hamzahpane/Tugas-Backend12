import React from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom";
import ProdcutList from "./Components/productList";
import AddProduct from "./Components/addProduct";
import EdiProduct from "./Components/editProduct";
import Detail from "./Components/detail";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
        <Route  path="/" element= {<ProdcutList/>} />
        <Route  path="/add" element= {<AddProduct/>} />
        <Route  path="edit/:id" element= {<EdiProduct/>} />
        <Route  path="detail/:id" element= {<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
