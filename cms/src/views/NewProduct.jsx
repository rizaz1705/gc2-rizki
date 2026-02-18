import Form from "../component/Form";
import { useNavigate } from "react-router"; // Pastikan route-dom
import axios from 'axios';
import Toastify from 'toastify-js';
import baseUrl from "../constant/baseUrl";

export default function NewProduct() {
  const navigate = useNavigate();

  async function handleSubmit(e, form) {
    e.preventDefault(); 
    try {
      const { data } = await axios.post(`${baseUrl}/lodgings`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })

      // Munculkan Toast Sukses
      Toastify({
        text: "Success add new lodging!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#34D399", color: "black", borderRadius: "8px" },
      }).showToast();

      // Redirect ke halaman list
      navigate("/product");

    } catch (error) {
      // Ambil pesan error detail dari server (Error 400/500)
      const errorMsg = error.response?.data?.message || "Something went wrong";
      
      Toastify({
        text: errorMsg,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#F87171", color: "black", borderRadius: "8px" },
      }).showToast();
      
      console.error(error);
    }
  }

  return (
    <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">Add Product</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <Form nameProp={"Add Product"} handleSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
}