import { NavLink } from "react-router";

export default function Card({lodging}){
    const formatIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  return (
        <>
        <ul className="w-full grid grid-cols-1 gap-y-6 p-8">
    <li className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
      <div className="md:w-80 lg:w-96 shrink-0">
        <img
          src={lodging.imgUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-8 flex flex-col justify-between flex-1">
        <div>
          <span className="mb-2 block text-sm font-bold tracking-wider text-indigo-500 uppercase">
            {lodging.location}
          </span>
          <h3 className="mb-3 text-slate-900 font-bold text-2xl">
            {lodging.name}
          </h3>
          <div className="prose prose-slate text-slate-600 max-w-none">
            <p>
              {formatIDR(lodging.price)}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <NavLink
            className="group inline-flex items-center h-10 rounded-full text-sm font-semibold px-6 bg-slate-900 text-white hover:bg-indigo-600 transition-all"
            to={`/detail/${lodging.id}`}>
        See Detail
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </li>
    
  </ul>
        </>
    )
}