import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import {Outlet} from "react-router"

export default function BaseLayout (){
   return (
    <>
    <div>
        <Navbar />
        <Sidebar />
        <Outlet />
        
    </div>
    </>
   )
}