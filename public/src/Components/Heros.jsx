export default function Heros (){
    return(
        <> <section className="bg-[#C2EFD4] py-16 overflow-hidden">
    <div className="flex flex-col lg:flex-row mx-auto max-w-[1440px] justify-between items-center px-8 lg:px-20 gap-12">
      <div className="max-w-[649px] animate-fade-in-left">
        <h1 className="text-[#224f34] text-[64px] lg:text-[86px] font-bold font-['Rufina'] leading-tight">
          Wear your style, live your vibe!
        </h1>
     
        <button className="px-12 py-4 text-white text-lg font-semibold font-['Poppins'] uppercase bg-[#224e34] rounded-sm shadow-xl hover:bg-[#1a3a27] hover:-translate-y-1 transition-all duration-300 active:scale-95">
          Explore Now
        </button>
      </div>
      <div className="relative group">
        <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#224f34] rounded-[40px] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
        <div className="relative overflow-hidden rounded-[30px] shadow-2xl animate-float">
          <img
            className="w-full max-w-[570px] h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/hotel-extranet/2025/03/20/942752f8-a7cb-4e73-985e-084ed1f03801-1742468303529-fa6551df13e3001f0783861d6b2206cf.jpg"
            alt="Fashion Discovery"
          />
        </div>
      </div>
    </div>
  </section>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n  @keyframes float {\n    0% { transform: translateY(0px); }\n    50% { transform: translateY(-15px); }\n    100% { transform: translateY(0px); }\n  }\n  .animate-float {\n    animation: float 5s ease-in-out infinite;\n  }\n  @keyframes fade-in-left {\n    from { opacity: 0; transform: translateX(-30px); }\n    to { opacity: 1; transform: translateX(0); }\n  }\n  .animate-fade-in-left {\n    animation: fade-in-left 1s ease-out;\n  }\n"
    }}
  />
        </>
    )
}