import React from 'react'
import Usermenu from '../component/Usermenu'
import  { Useauth } from '../pages/Usercontext'
const userdashboard = () => {
  const [userauth,setuserauth]= Useauth();
  return (
    <div className='dashboard'>
        <Usermenu/>
        <div className='userdetail'>
          <h1>User_Details</h1>
          <h3><span>Name:</span>{userauth?.user?.name}</h3>
          <h3><span>Email:</span>{userauth?.user?.email}</h3>
          <h3><span>Phone:</span>{userauth?.user?.phone}</h3>
          <h3><span>Address:</span>{userauth?.user?.address}</h3>
        </div>
    </div>
  )
}

export default userdashboard
