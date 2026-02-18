import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Form from "../component/Form";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl"

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [lodging, setLodging] = useState({});

  async function handleSubmit(e, form) {
    e.preventDefault(); 
    try {
      const { data } = await axios.put(`${baseUrl}/lodgings/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      });

      navigate("/product");
      Toastify({
        text: data.message,
        duration: 3000,
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black"
        },
      }).showToast();
      
    } catch (error) {
      Toastify({
        text: error.response.data.message || "Error 400: Bad Request",
        style: { background: "#F87171", color: "black" },
      }).showToast();
    }
  }
  async function fetchProduct() {
  try {
    const { data } = await axios.get(`${baseUrl}/lodgings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`
      }
    });
    setLodging(data.data || data);
  } catch (error) {
    Toastify({
      text: error.response?.data?.message || "Error 400: Bad Request",
      style: { background: "#F87171", color: "black" },
    }).showToast();
  }
}


 useEffect(() => {
  fetchProduct()
 },[])

  return (
    <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-4 text-primary">Edit Product</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {lodging ? (
            <Form nameProp={"Edit Product"} handleSubmit={handleSubmit} lodgings={lodging} />
          ) : (
            <div className="text-center p-5">
               <div className="spinner-border text-primary" role="status"></div>
               <p className="mt-2">Loading data ID: {id}...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}