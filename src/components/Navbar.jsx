import React from 'react'
import MediaQuery from 'react-responsive'
const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white w-full'>
      <div className="mycontainer flex justify-around items-center p-3">
        <div className="logo font-extrabold text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
   <MediaQuery minWidth={768}>
          <div className='font-bold  text-xl text-green-100 '>Password Manager</div>
        </MediaQuery>
        <button className='text-white ring-green-500 ring-1 p-2 md:p-1 rounded-full flex gap-4 font-bold justify-center items-center'>
          <img className='invert w-10' src="icons/github.svg" alt="" />
          GitHub
        </button>
      </div>
    </nav>
  )
}

export default Navbar
