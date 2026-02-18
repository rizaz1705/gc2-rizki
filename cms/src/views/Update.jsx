import { useState } from "react"
import baseUrl from "../constant/baseUrl"
import axios from 'axios'
import { useNavigate,useParams } from "react-router";
import Toastify from "toastify-js";


export default function Update(){
  const [file,setFile] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  async function handleSubmitUpload(e) {
    e.preventDefault()
    try {
      const formData =  new FormData()
      formData.append("file",file)
      const { data } = await axios.patch(`${baseUrl}/lodgings/upload/${id}`,formData,{
        headers:{
          Authorization : `Bearer ${localStorage.access_token}`,
          
        }
      })
      Toastify({
              text: data.message,
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "#34D399", color: "black", borderRadius: "8px" },
            }).showToast();

            navigate("/product")

    } catch (error) {
      Toastify({
              text: error.response.data.message,
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "#F87171", color: "black", borderRadius: "8px" },
            }).showToast();
    }
  }


    return(
      <>
        <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="update-product-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form id="register-form" onSubmit={(e) => handleSubmitUpload(e)}>
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                {/* <div class="mb-3"> */}
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control pb-2"
                    id="inputGroupFile02"
                    autoComplete="off"
                    required=""
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Update Image
                </button>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}