import axios from 'axios'
import { Link, NavLink, useParams } from "react-router";
import { useEffect, useState } from 'react'

export default function Detail(){
    const {id} = useParams()
    const [lodging,setLodging] = useState([id])

    async function detailLodging() {
        try {
            const {data} = await axios.get(`https://hacktivep2.rizaz1705.online/pub/${id}`)
            setLodging(data.data)

        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        detailLodging()
    }, [id])

    const formatIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };


    return (
      
        <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rent Room - Interior Detail</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Syne:wght@700&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2 { font-family: 'Syne', sans-serif; }\n        .ren-bg { background-color: #F9F7F2; } /* Warna krem khas Ren Room */\n        .ren-accent { background-color: #4A5D4E; } /* Hijau Sage/Earth tone */\n    "
    }}
  />
  <div className="max-w-6xl mx-auto px-6 py-12">
    <header className="flex justify-between items-center mb-12">
      <div className="text-2xl font-bold tracking-tighter uppercase">
        Rent <span className="font-light italic">Room</span>
      </div>
      <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
        <NavLink className="hover:underline" 
        to = "/"> Katalog
        </NavLink>
      </nav>
    </header>
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-7 space-y-6">
        <div className="overflow-hidden rounded-sm shadow-xl transition-transform hover:scale-[1.01] duration-500">
          <img
            src={lodging.imgUrl}
            alt= "ini gambar"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">
            kapasitas : {lodging.roomCapacity} orang
          </h2>
          <h1 className="text-5xl font-bold leading-tight mb-4 text-gray-900">
            {lodging.name}
          </h1>
          <p className="text-2xl font-light text-gray-700 italic">
            {formatIDR(lodging.price)}
          </p>
        </div>
        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest mb-3 text-gray-400">
              Filosofi Desain
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Deskripsi ini untuk menjelaskan detail barang.
            </p><br />
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest mb-3 text-gray-400">
              {lodging.facility}
            </h3>
          </div>
          </div>
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest mb-3 text-gray-400">
              {lodging.location}
            </h3>
          </div>
          <div className="pt-6 space-y-4">
            <button className="w-full ren-accent text-white py-5 px-8 text-sm uppercase tracking-[0.2em] font-bold hover:opacity-90 transition shadow-lg">
              Bicara dengan kami
            </button>
            <button className="w-full border border-gray-800 py-5 px-8 text-sm uppercase tracking-[0.2em] hover:bg-gray-800 hover:text-white transition">
              Simpan ke Wishlist
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Lulus Uji Ketahanan
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Kayu Berkelanjutan
          </div>
        </div>
      </div>
    </main>
  </div>
</>

        
    )
}