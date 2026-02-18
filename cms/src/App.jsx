import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./component/Navbar"
import Sidebar from "./component/Sidebar"
import Category from "./views/Type"
import EditProduct from "./views/Edit"
import Login from "./views/login"

import NewProduct from "./views/NewProduct"
import NewUser from "./views/NewUser"
import Product from "./views/Product"
import Update from "./views/Update"
import BaseLayout from "./views/BaseLayout";
import Type from "./views/Type";


function App() {
  

  return(<>
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />


      <Route element={<BaseLayout />}>
        <Route path="/product" element={<Product />} />
        <Route path="/addProducts" element={<NewProduct />} />
        <Route path="/editProducts/:id" element={<EditProduct />} />
        <Route path="/updateProducts/:id" element={<Update />} />
        <Route path="/type" element={<Type />} />
        <Route path="/register" element={<NewUser />} />
      </Route >
    </Routes>
  </BrowserRouter>


  {/* Preloader */}
  <div id="preloader" style={{ display: "none" }}>
    <div className="loading">
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_remmdtqv.json"
        background="transparent"
        speed={1}
        style={{ width: 300, height: 300 }}
        loop=""
        autoPlay=""
      />
    </div>
  </div>
  
  <section className="container-fluid" id="home-section">
    <div className="row">
     
    </div>
  </section>
  {/* End Home Section */}
</>
)
}

export default App
