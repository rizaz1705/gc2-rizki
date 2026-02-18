import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import Toastify from 'toastify-js'
import baseUrl from "../constant/baseUrl"

export default function Product() {
  const [lodging, setLodging] = useState([])
  const [types, setTypes] = useState([]) 
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [filterType, setFilterType] = useState("")
  const [sortKey, setSortKey] = useState("")


  async function homeProduct() {
    try {
      const { data } = await axios.get(`${baseUrl}/lodgings?limit=100`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      })
      setLodging(data.data || data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  
  async function fetchTypes() {
    try {
      const { data } = await axios.get(`${baseUrl}/types`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      })
      setTypes(data.data || data)
    } catch (error) {
      console.error("Error fetching types:", error)
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure?")) return;
    try {
      const { data } = await axios.delete(`${baseUrl}/lodgings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      })
      Toastify({ text: data.message, duration: 3000, style: { background: "#34D399", color: "black" } }).showToast()
      homeProduct()
    } catch (error) {
      Toastify({ text: error.response?.data?.message || "Error", duration: 3000, style: { background: "#F87171", color: "black" } }).showToast()
    }
  }

  useEffect(() => {
    homeProduct()
    fetchTypes() 
  }, [])

  let filteredData = Array.isArray(lodging) ? [...lodging] : []

  if (filterType) {
    filteredData = filteredData.filter(item => {
     
      return (item.Type?.name === filterType) || (item.type === filterType);
    })
  }

  if (sortKey === "priceAsc") {
    filteredData.sort((a, b) => a.price - b.price)
  } else if (sortKey === "priceDesc") {
    filteredData.sort((a, b) => b.price - a.price)
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">Products</h1>
        <NavLink to='/addProducts' className="btn btn-primary rounded-pill">
          <span className="icon material-symbols-outlined">add</span>New product
        </NavLink>
      </div>

      <div className="mb-3 d-flex gap-3">
        
        <select 
          className="form-select w-25" 
          onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }} 
          value={filterType}
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>

        <select className="form-select w-25" onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="">Default Sort</option>
          <option value="priceAsc">Price Asc</option>
          <option value="priceDesc">Price Desc</option>
        </select>
      </div>

      <div className="row">
        <div className="col-12 table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th width="180px">Image</th>
                <th>Facility</th>
                <th>Price</th>
                <th>Author</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td className="fw-bold">{item.name}</td>
                    <td>
                      <img 
                        src={item.imgUrl} 
                        alt={item.name} 
                        style={{ borderRadius: '8px', width: '100px', height: '70px', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = "https://placehold.co/100x70?text=No+Image" }}
                      />
                    </td>
                    <td>{item.facility}</td>
                    <td className="fw-bold">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                    </td>
                    <td>{item.User?.email || "N/A"}</td>
                    <td>
                      <div className="d-flex">
                        <button onClick={() => handleDelete(item.id)} className="btn btn-link p-0 text-danger">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                        <NavLink className="ms-2 text-primary" to={`/editProducts/${item.id}`}>
                          <span className="material-symbols-outlined">edit</span>
                        </NavLink>
                        <NavLink className="ms-2 text-success" to={`/updateProducts/${item.id}`}>
                          <span className="material-symbols-outlined">image</span>
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`} 
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  )
}