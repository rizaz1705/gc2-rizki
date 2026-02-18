import { NavLink, useNavigate } from 'react-router' // Gunakan useNavigate

export default function Sidebar() {
  const navigate = useNavigate()

  function handleLogout(e) {
    e.preventDefault()
    
    // 1. Bersihkan semua data di storage
    localStorage.clear() 
    
    // 2. Tendang ke login & gunakan { replace: true } agar jejak di history hilang
    navigate('/login', { replace: true })
  }

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar-menu">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to='/product'>
              <span className="icon material-symbols-outlined me-2">shopping_bag</span>
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/type'>
              <span className="icon material-symbols-outlined me-2">category</span>
              Type
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/register'>
              <span className="icon material-symbols-outlined me-2">account_circle</span>
              Add User
            </NavLink>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Account</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link">
              <span className="icon material-symbols-outlined me-2">person</span>
              Hej, <span id="username">Admin!</span>
            </a>
          </li>
          <li className="nav-item">
            {/* Menggunakan tag <a> dengan onClick untuk logout */}
            <a 
              className="nav-link" 
              onClick={handleLogout} 
              style={{ cursor: 'pointer' }}
            >
              <span className="icon material-symbols-outlined me-2">logout</span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}