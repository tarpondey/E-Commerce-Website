import React from 'react'
import {NavLink} from "react-router-dom"
import { Useauth } from '../pages/Usercontext'
import { Usecart } from '../pages/Cartcontext'
const Navbar = () => {
    const [userauth,setuserauth] =Useauth();
    const [cart,setcart]= Usecart();

    function logout(){
        setuserauth({...userauth,user:null,token:""});
        localStorage.removeItem("auth")
    }
  return (
    <main>
        <nav className='main-nav'>
            <ul>
                <li>
                    <NavLink to={"/"}>
                        Snap Cart
                    </NavLink>
                </li>
                
                {
                    userauth?.user ?(
                        <div>
                        <li>
                            <NavLink to={`/dashboard/${userauth?.user?.role===1 ? "admin": "user"}`}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={logout} to={"/login"}>
                                LogOut
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/cart"}>
                                Cart ({cart?.length})
                            </NavLink>
                        </li>
                    </div>
                    ):(
                        <div>
                            <li>
                                <NavLink to={"/register"}>
                                    SignUp
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to={"/login"}>
                                    LogIn
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/cart"}>
                                    Cart ({cart?.length})
                                </NavLink>
                            </li>
                        </div>
                    )
                }

            </ul>
        </nav>
    </main>
  )
}

export default Navbar
