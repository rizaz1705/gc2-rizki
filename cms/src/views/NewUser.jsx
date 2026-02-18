import { useState } from "react";
import { useNavigate } from "react-router"; 
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constant/baseUrl";

export default function NewUser() {
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  });

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    
 
    let fieldName = id.replace("register-", "");
    
   
    if (fieldName === "phone") fieldName = "phoneNumber";

    setForm({
      ...form,
      [fieldName]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const { data } = await axios.post(`${baseUrl}/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      });

     
      Toastify({
        text: "Success register new user",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black"
        },
      }).showToast();

    
      navigate("/product");

    } catch (error) {
    
      Toastify({
        text: error.response?.data?.message || "Failed to register user",
        duration: 3000,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black"
        },
      }).showToast();
      console.log(error);
    }
  };

  return (
    <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-user-section">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="pt-3 pb-2 mb-3 border-bottom">
            {/* Hubungkan handleSubmit ke event onSubmit form */}
            <form id="register-form" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 display-1">Register User</h1>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-username">Username</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="register-username"
                  placeholder="Enter username ..."
                  autoComplete="off"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-email">Email</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="register-email"
                  placeholder="Enter email address ..."
                  autoComplete="off"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="register-password">Password</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="register-password"
                  placeholder="Enter password ..."
                  autoComplete="off"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-phone"
                  placeholder="Enter phone number (optional) ..."
                  autoComplete="off"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-address">Address</label>
                <textarea
                  id="register-address"
                  className="form-control"
                  rows={3}
                  placeholder="Enter address (optional) ..."
                  autoComplete="off"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}