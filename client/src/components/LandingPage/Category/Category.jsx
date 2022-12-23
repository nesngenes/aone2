import React from 'react'
import './styles.css'
import { blueJersey, bluePants, blueShoes } from '../../../assets'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div className='category'>
      
      <h1>Category</h1>
      
      <div className='category-products'>
        <Link to='/aone/products/category?category=top' className='category-product'> 
          <img src={blueJersey} width='300px' />
          <h2>Top</h2>
        </Link>

        <Link to='/aone/products/category?category=pants' className='category-product'> 
          <img src={bluePants} width='300px' />
          <h2>Pants</h2>
        </Link>

        <Link to='/aone/products/category?category=shoes' className='category-product'> 
          <img src={blueShoes} width='300px' />
          <h2>Shoes</h2>
        </Link>
      </div>
    </div>
  )
}

export default Category