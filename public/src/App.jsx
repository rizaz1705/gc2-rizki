import Detail from "./Views/Detail";
import HomePage from "./Views/HomePage"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
 return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>,


      </>
 )
}


export default App
