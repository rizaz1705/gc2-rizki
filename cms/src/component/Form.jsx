import { useState, useEffect } from "react";
import MediumBtn from "./MediumBtn";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";
import axios from 'axios';

export default function Form({ nameProp, handleSubmit, lodgings }) {
  const [type, setType] = useState([]);
  const [form, setForm] = useState({
    name: "",
    facility: "",
    roomCapacity: 0,
    imgUrl: "",
    price: 0,
    location: "",
    typeId: ""
  });

  useEffect(() => {
    if (lodgings) {
      setForm({
        name: lodgings.name,
        facility: lodgings.facility,
        roomCapacity: lodgings.roomCapacity,
        imgUrl: lodgings.imgUrl,
        price: lodgings.price,
        location: lodgings.location,
        typeId: lodgings.typeId
      });
    }
  }, [lodgings]);

  function handleForm(e, fieldName) {
    const value = e.target.value;
    if (fieldName === 'price' || fieldName === 'typeId' || fieldName === 'roomCapacity') {
      setForm((oldValue) => ({
        ...oldValue,
        [fieldName]: +value 
      }));
    } else {
      setForm((oldValue) => ({
        ...oldValue,
        [fieldName]: value
      }));
    }
  }

  async function fetchType() {
    try {
      const { data } = await axios.get(`${baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      });
     
      setType(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.message || "Failed to fetch types",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#F87171", color: "black", borderRadius: "8px" },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchType();
  }, []);

  return (
    <form className="p-4 border rounded shadow-sm bg-light" onSubmit={(e) => handleSubmit(e, form)}>
      <h3 className="mb-4 text-center text-muted">{nameProp}</h3>

      <div className="mb-3">
        <label className="form-label fw-bold">Name</label>
        <input
          type="text" className="form-control" required
          value={form.name}
          onChange={(e) => handleForm(e, "name")}
          placeholder="Enter Name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Location</label>
        <input
          type="text" className="form-control" required
          value={form.location}
          placeholder="Enter Location"
          onChange={(e) => handleForm(e, "location")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Facility</label>
        <input
          type="text" className="form-control" required
          value={form.facility}
          placeholder="Enter Facility"
          onChange={(e) => handleForm(e, "facility")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Type</label>
        <select
          className="form-select" required
          value={form.typeId}
          onChange={(e) => handleForm(e, "typeId")}
        >
          <option value="" disabled>-- Select Type --</option>
          {type.map((t) => (
            <option value={t.id} key={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Room Capacity</label>
          <input
            type="number" className="form-control" required
            value={form.roomCapacity}
            onChange={(e) => handleForm(e, "roomCapacity")}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Price</label>
          <input
            type="number" className="form-control" required
            value={form.price}
            onChange={(e) => handleForm(e, "price")}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Image URL</label>
        <input
          type="text" className="form-control" required
          value={form.imgUrl}
          placeholder="Enter ImgUrl here"
          onChange={(e) => handleForm(e, "imgUrl")}
        />
      </div>

      
      <div className="row g-3">
        <div className="col-6">
          <MediumBtn
            tag="Cancel"
            type="button"
            onClick={() => window.history.back()}
          />
        </div>
        <div className="col-6">
          <MediumBtn
            tag={nameProp}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}