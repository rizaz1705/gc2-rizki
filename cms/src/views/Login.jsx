import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router";
import MediumBtn from "../component/MediumBtn";
import baseUrl from "../constant/baseUrl";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // Mencegah refresh halaman
    try {
      // console.log(email,password,'udin');
      
      const { data } = await axios.post(`${baseUrl}/login`, { email, password });
      console.log(data);
      
      // Simpan token (sesuaikan path data.data.token dengan response asli API-mu)
      localStorage.setItem('access_token',data.access_token);
      
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  }

  // Proteksi Route: Jika sudah ada token, langsung lempar ke Home
  if (localStorage.getItem('access_token')) {
    return <Navigate to='/product' />;
  }

  return (
    <section className="container" id="login-section">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-3 mt-5">Login Options</h1>
          <p className="text-muted">
            Log in and autocomplete your order with your personal data, or sign up
            to enjoy all the benefits of an IDEA account.
          </p>
        </div>

        <div className="col-12 col-lg-8 offset-lg-2 my-5">
          <div className="row border rounded-4 overflow-hidden bg-white shadow-sm">
            {/* Sisi Gambar */}
            <div className="col-12 col-md-6 border-end p-5 d-flex align-items-center justify-content-center bg-light">
              <img
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
                className="img-fluid"
                style={{ maxWidth: "250px" }}
                alt="sofa"
              />
            </div>

            {/* Sisi Form */}
            <div className="col-12 col-md-6 p-5">
              <div className="form-signin">
                {/* HANYA GUNAKAN SATU TAG FORM */}
                <form onSubmit={handleLogin}>
                  <h1 className="h3 mb-3 fw-bold">Log in to your account</h1>
                  <p className="text-muted small mb-4">
                    Log in on your profile to autocomplete your purchase order
                    with your personal data.
                  </p>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-email">Email</label>
                      <span className="text-danger fw-bold">*</span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="login-email"
                      placeholder="Enter email address ..."
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-password">Password</label>
                      <span className="text-danger fw-bold">*</span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="login-password"
                      placeholder="Enter your password ..."
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="checkbox mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="login-remember"
                      />
                      <label className="form-check-label" htmlFor="login-remember">
                        Remember me
                      </label>
                    </div>
                  </div>

                  {/* Pastikan tombol di dalam MediumBtn bertipe submit */}
                  <div className="d-grid">
                    <button type="Submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}