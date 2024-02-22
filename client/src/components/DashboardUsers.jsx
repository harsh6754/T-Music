import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { motion } from "framer-motion";
import moment from 'moment';


export const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setisUserRoleUpdated] = useState(false)
  const createdAt = moment(new Date(data.createdAt)).format("MMM Do YYYY");

  return (
    <motion.div className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'>

      {/* Users Image */}
      <div className='w-275 min-w-[160px] flex items-center justify-center'>
        <img src={data.imageURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md' />
      </div>

      {/*Users Name */}
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.name}
      </p>

      {/* Users Email */}
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email}
      </p>

      {/* Users email Verified */}

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email_verified ? "True" : "False"}
      </p>

      {/* Users CreatedAt */}
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {createdAt}
      </p>

      {/* Users Roles */}

      {/* <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.role}
      </p> */}

      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
        <p className='text-base text-textColor text-center'>
          {data.role}
        </p>
        {
          data._id !== user?.user._id && (
            <motion.p whileTap={{ scale: 0.75 }} className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md" onClick={() => setisUserRoleUpdated(true)}>
              {data.role === "admin" ? "Member" : "Admin"}
            </motion.p>
          )
        }
        {isUserRoleUpdated && (
          <motion.div className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
            <p className="text=textColor text-[12px] font-semibold">
              Are you sure, do you want to mark the User as
              <span>{data.role === 'admin' ? " Member" : " Admin"}</span> ?
            </p>
            <div className='flex items-center justify-center gap-4 ml-10 mr-10'>
              <motion.button whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md'
              >
                Yes
              </motion.button>

              <motion.button whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md ' 
                onClick={()=> setisUserRoleUpdated(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>


      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3'>
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Count : <span className='text-xl font-bold text-textColor'>
              {allUsers?.length}
            </span>
          </p>
        </div>
        <div className='w-full min-w-[750px] flex items-center justify-between'>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Image
          </p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Name
          </p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Email
          </p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Verified
          </p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Created
          </p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>
            Role
          </p>

        </div>
        {
          allUsers && (
            allUsers?.map((data, i) => (
              <DashboardUserCard data={data} index={i} />
            )
            )
          )
        }

      </div>
    </div>
  )
}


export default DashboardUsers