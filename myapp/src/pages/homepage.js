import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { Usecart } from './Cartcontext'
const homepage = () => {
  const [product,setproduct]=useState([])
  const navigate= useNavigate();
  const [cart,setcart] = Usecart();
  async function addtocart(val){
    setcart([...cart,val])
    localStorage.setItem("cart",JSON.stringify([...cart,val]))
    alert("Item Added to cart.")
  }

  async function allproduct(){
    const response= await axios.get("http://localhost:8080/allproduct" );
    if(response.status===200){
      console.log(response)
      setproduct(response.data.products);
    }
  }

  useEffect(()=>{
    allproduct();
  },[])
  return (
    <div className='grid-container'>
      {
        product.map((val)=>(
          <>
          <div className='child'>
            <img src={`http://localhost:8080/uploads/${val.img}`} width={230} height={200} />
            <p>{val.name}</p>
            <h3><span>Price:</span>{val.price}</h3>
            <button onClick={()=>navigate(`/product/${val._id}`)}>More Detail</button>
            <button onClick={()=>addtocart(val)}>ADDtoCART</button>
          </div>
          </>
        ))
      }
    </div>
  )
}

export default homepage
