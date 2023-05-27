import React from 'react'
import {NavLink} from "react-router-dom"
const Usermenu = () => {
  return (
    <div>
      <ul className='dashboardul'>
        <div>
          <NavLink to={"/dashboard/user/orders"}>Orders</NavLink>
          <NavLink to={"/dashboard/user/edit"}>Edit Prifile</NavLink>
        </div>
      </ul>
    </div>
  )
}

export default Usermenu
