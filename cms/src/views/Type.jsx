import { useEffect, useState } from "react";
import axios from "axios";

export default function Type() {
  // 1. Siapkan state untuk menampung data array dari API
  const [types, setTypes] = useState([]);

  // 2. Fungsi untuk mengambil data dari server
  async function fetchTypes() {
    try {
      const { data } = await axios.get('https://hacktivep2.rizaz1705.online/types', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      });
      // Sesuaikan dengan struktur data API (biasanya data.data)
      setTypes(data.data);
    } catch (error) {
      console.log("Gagal mengambil data type:", error);
    }
  }

  // 3. Jalankan fetchTypes saat komponen pertama kali muncul
  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="category-section"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">Type</h1>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody id="table-category">
              {/* 4. Lakukan MAPPING di sini */}
              {types.map((type, index) => (
                <tr key={type.id}>
                  {/* index + 1 digunakan agar nomor urut mulai dari 1 */}
                  <td scope="row">#{index + 1}</td>
                  <td className="fw-bold">{type.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Tampilkan pesan jika data kosong */}
          {types.length === 0 && (
            <p className="text-center mt-3">No data available.</p>
          )}
        </div>
      </div>
    </section>
  );
}