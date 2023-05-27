import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Adminmenu from '../component/Adminmenu'
import { Useauth } from '../pages/Usercontext'
import moment from 'moment'
import {Select} from "antd";
const {Option}=Select;
const Adminorder = () => {
    const {status,setstatus}=useState(["Not process","Processing","Shipping","Delivered","Cancel"]);
    const [orders,setorders]=useState([]);
    const [userauth,setuserauth]=Useauth();
    const getorders=async ()=>{
        try {
            const {data}=await axios.get("http://localhost:8080/allorders");
            console.log(data)
            setorders(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(userauth?.token) getorders();
    },[userauth?.token])

    const handlechange=async(id,value)=>{
        try {
            const {data}=await axios.put(`http://localhost:8080/orderstatus/$(id)`,{status:value});
            console.log(data)
            getorders();
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <Adminmenu/>
      <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Status</th>
                <th>Buyer</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Quantity</th>
            </tr>
        </thead>
        {orders.map((o,i)=>(
            <div key={i}>
                <tbody>
                    <tr>
                        <td>{i+1}</td>
                        <td>
                            <Select bordered={false} onChange={(value)=>handlechange(o._id,value)}
                            defaultValue={o?.status}
                            >
                                {status.map((s,i)=>(
                                    <Option key={i} value={s}>
                                        {s}
                                    </Option>
                                ))}
                                
                            </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "success":"failed"}</td>
                        <td>{o?.products?.length}</td>
                    </tr>
                </tbody>
                <div>
                    {o?.products?.map((p,i)=>(
                        <div>
                            <img src={`http://localhost:8080/uploads/${p.img}`} width={200}/>
                            <div>
                                <p>{p.name}</p>
                                <p>{p.description}</p>
                                <p>{p.price}</p>
                                <p>{p.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </table>
    </div>
  )
}

export default Adminorder
