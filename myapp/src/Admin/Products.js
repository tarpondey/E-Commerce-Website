import React, { useEffect, useState } from 'react'
import axios from "axios"
import Adminmenu from '../component/Adminmenu'
import { useNavigate } from "react-router-dom"

const Products = () => {
  const [product, setproduct] = useState([])
  const navigate = useNavigate();

async function productdelete(id){
  const response= await axios.delete(`http://localhost:8080/deleteproduct/${id}`)
  if(response.status===200){
    allproduct();
  }
  else{
    alert("Product not deleted.")
  }
}
  const allproduct = async () => {
    const response = await axios.get("http://localhost:8080/allproduct")
    if (response.status === 200) {
      setproduct(response.data.products)
    }

  }
  useEffect(() => {
    allproduct();
  }, [])
  return (
    <div className='Adminmenu'>
      <Adminmenu />
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Description</th>
            <th>category</th>
            <th>Price</th>
            <th>Image</th>
            <th className='action-btn'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map((val, ind) => (
              <tr className='tbody-child'>
                <td>{ind + 1}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>{val.category}</td>
                <td>{val.price}</td>
                <td>
                  <img src={`http://localhost:8080/uploads/${val.img}`} width={200} />
                </td>
                <td className='action'>
                  <td className='action1' onClick={() => navigate(`/dashboard/admin/editproduct/${val._id}`)}>Edit</td>
                  <td className='action2' onClick={() => productdelete(val._id)}> Delete</td>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Products
