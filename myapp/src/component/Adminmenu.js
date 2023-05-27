import React from 'react'
import {NavLink} from "react-router-dom"
const Adminmenu = () => {
  return (
    <div>
      <ul className='dashboardul'>
        <div>
          <NavLink to={"/dashboard/admin/orders"}>Orders</NavLink>
          <NavLink to={"/dashboard/admin/addproduct"}>Add Products</NavLink>
          <NavLink to={"/dashboard/admin/products"}>Products</NavLink>
          <NavLink to={"/dashboard/user/edit"}>Edit Prifile</NavLink>
        </div>
      </ul>
    </div>
  )
}

export default Adminmenu
