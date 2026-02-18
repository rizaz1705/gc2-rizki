export default function Pagination({ totalPage, currentPage, setCurrentPage }) {
  // Membuat array angka halaman, misal: [1, 2, 3, 4, 5]
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  if (totalPage <= 0) return null;

  return (
    <div className="flex justify-center items-center w-full my-10">
      <div className="inline-flex rounded-xl bg-white shadow-sm p-2 border border-slate-100">
        <ul className="flex items-center">
          {/* Tombol Previous */}
          <li className="px-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
            >
              <svg width={8} height={15} viewBox="0 0 8 15" className="fill-current">
                <path d="M7.12979 1.91389L1.61729 7.77639L7.12979 13.8693" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </li>

          {pages.map((page) => (
            <li key={page} className="px-1">
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md border transition-all font-semibold ${
                  currentPage === page
                    ? "border-cyan-500 bg-cyan-50 text-cyan-600 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:border-cyan-500 hover:text-cyan-500"
                }`}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Tombol Next */}
          <li className="px-2">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPage}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
            >
              <svg width={8} height={15} viewBox="0 0 8 15" className="fill-current">
                <path d="M0.870212 1.91389L6.38271 7.77639L0.870212 13.8693" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}