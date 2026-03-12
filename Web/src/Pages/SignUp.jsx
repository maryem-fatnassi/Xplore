import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Globe from "../Components/Globe"
import "../CSS/authCss/auth.css";
import { signUp } from "../Services/authService/signUp";

function SignUp(){

  const navigate = useNavigate()
  const [zoom,setZoom] = useState(false)

  const zoomEarth = () => {
    setZoom(true)
    setTimeout(()=>{
      navigate("/home")
    },2200)
  }

  const [form , setForm] = useState({
    userName : "",
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
  const {userName,email,password} = form;
  if(!userName|| !email|| !password) {
    alert('please fill in all the fields')
    return
  }

  try {
    const data = await signUp(form)
    if(data){
      zoomEarth()
    }
  } catch (error) {
    console.log(error)  
  }
}

  return(

    <div className="page">

      <div className="globe">
        <Globe zoom={zoom}/>
      </div>

      <form className="card" onSubmit={handleSubmit}>

        <h2>SignUp</h2>
        <input name="userName" placeholder="Name..." type="text" value={form.userName} onChange={handleChange}/>
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange}/>
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange}/>

        <button type="submit">
          Start Adventure
        </button>
        <div className="question">
          <p>have an account?</p>
          <Link to="/" className="auth-link">Login</Link>
        </div>
      </form>

    </div>

  )

}

export default SignUp;