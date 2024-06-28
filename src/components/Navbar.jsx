import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-pink-500 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 '>Daily Planner</span>
        </div>
      <ul className="flex gap-9 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        
      </ul>
    </nav>
  )
}

export default Navbar