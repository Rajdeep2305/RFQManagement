import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link to={'/'}>
      <img className='w-[300px]' src={assets.logo} alt="" />
      </Link>
    </div>
  )
}

export default Logo
