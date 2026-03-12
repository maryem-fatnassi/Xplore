import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Globe from "../Components/Globe"
import "../CSS/authCss/auth.css";
import { login } from "../Services/authService/login";

function Login(){

  const navigate = useNavigate()
  const [zoom,setZoom] = useState(false)

  const zoomEarth = () => {

    setZoom(true)

    setTimeout(()=>{
      navigate("/home")
    },2200)

  }

  const [form , setForm] = useState({
    email: "",
    password:""
  });

  const handleChange = (e)=> {
    const {name,value} = e.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    const {email,password} = form;
    if(!email|| !password){
       alert('please fill in all the fields')
       return
    }
    try {
      await login(form)
      // if(data){
        zoomEarth()
      // }
    } catch (error) {
      const msg = error.res?.data?.message || "Something went wrong"
       alert(msg)
    }
  }

  return(

    <div className="page">

      <div className="globe">
        <Globe zoom={zoom}/>
      </div>

      <form className="card" onSubmit={handleSubmit}>

        <h2>Login</h2>
        <input placeholder="Email..." name="email" type="email" value={form.email} onChange={handleChange}/>
        <input placeholder="Password..." name="password"  type="password" value={form.password} onChange={handleChange}/>

        <button type="submit">
          Start Adventure
        </button>
        <div className="question">
          <p>Don't have an account?</p>
          <Link to="sign" className="auth-link">Sign Up</Link>
        </div>
      </form>

    </div>

  )

}

export default Login;