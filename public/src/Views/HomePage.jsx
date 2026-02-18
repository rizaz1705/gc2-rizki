import { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../Components/Card";
import Heros from "../Components/Heros";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";


const PROPERTY_TYPES = [
    { id: "1", name: "Villa" },
    { id: "2", name: "Hotel" },
    { id: "3", name: "Guest & Homestay" },
    { id: "4", name: "Resort" },
    { id: "5", name: "Kost" },
    { id: "6", name: "Apartemen" },
];

export default function HomePage() {
    const [lodging, setLodging] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    
    
    const [filter, setFilter] = useState(""); 
    const [sort, setSort] = useState("DESC"); 

    
    async function readLodgings() {
        try {
            console.log("Fetching with params:", { search, currentPage, filter, sort });

            const { data } = await axios.get(`https://hacktivep2.rizaz1705.online/pub`, {
                params: { 
                    search: search,
                    page: currentPage,
                    filter: filter, 
                    sort: sort 
                }
            });

            setLodging(data.data); 
            setTotalPage(data.totalPage);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    
    useEffect(() => {
        readLodgings();
    }, [search, currentPage, filter, sort]);

    
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filter, sort]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            
        
            <div className="flex flex-col w-full items-center py-10 bg-[#C2EFD4] shadow-inner">
                <form onSubmit={(e) => e.preventDefault()} className="max-w-[480px] w-full px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4 text-slate-800">Find Your Own Fashion Space</h1>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full border-none h-12 shadow-lg p-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Cari hunian..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            <Heros />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    
                    <aside className="w-full md:w-64 shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
                            <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                Filter & Sort
                            </h2>

                            
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Urutkan</h3>
                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="sortGroup" 
                                            value="DESC" 
                                            checked={sort === "DESC"} 
                                            onChange={(e) => setSort(e.target.value)} 
                                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" 
                                        />
                                        <span className="ml-3 text-sm text-slate-600 group-hover:text-indigo-600 font-medium">Terbaru</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="sortGroup" 
                                            value="ASC" 
                                            checked={sort === "ASC"} 
                                            onChange={(e) => setSort(e.target.value)} 
                                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" 
                                        />
                                        <span className="ml-3 text-sm text-slate-600 group-hover:text-indigo-600 font-medium">Terlama</span>
                                    </label>
                                </div>
                            </div>

                            
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tipe Properti</h3>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="">Semua Tipe</option>
                                    {PROPERTY_TYPES.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                           
                            <button 
                                onClick={() => {setFilter(""); setSort("DESC"); setSearch("");}} 
                                className="w-full py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                                Reset Semua
                            </button>
                        </div>
                    </aside>

                    
                    <div className="flex-1">
                        {lodging && lodging.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {lodging.map((el) => <Card key={el.id} lodging={el} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-gray-400">
                                Hunian tidak ditemukan.
                            </div>
                        )}

                        <Pagination 
                            totalPage={totalPage} 
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage} 
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}