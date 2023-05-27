import React, { useState } from 'react'
import axios from "axios"
import {useNavigate, NavLink} from "react-router-dom"
import { Useauth } from './Usercontext'
const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate();
    const [userauth,setuserauth] =Useauth();
    const login= async(e)=>{
        e.preventDefault();
        const response= await axios.post("http://localhost:8080/login",{
            email,password
        })
        if(response.status===200){
            console.log(response)
            setuserauth({...userauth,user:response.data.user,token:response.data.token})
            localStorage.setItem("auth",JSON.stringify(response.data))
            navigate("/")
        }
        else{
            alert("Login Failed.")
        }
    };

    return (
        <div className='login'>
            <form onSubmit={login}>
                <input type='email' placeholder='enter your email' onChange={e => setemail(e.target.value)} />
                <input type='password' placeholder='enter your password' onChange={e => setpassword(e.target.value)} />
                <button>LogIn</button>
                <NavLink className={"fp"} to={"/forgotpassword"}>Forgot Password</NavLink>
            </form>
        </div>
    )
}

export default Login;
