import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='main'>
        <div className='content'>
            <h1>Being weak means that there is room to grow</h1>
            <Link className="links" to='/aone/products'>
              <button className='see-all-product'>See All Products</button>
            </Link>
        </div>
    </div>
  )
}

export default Main