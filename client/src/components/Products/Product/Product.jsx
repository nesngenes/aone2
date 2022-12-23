import React from 'react'
import './styles.css'
import {Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {deleteProduct} from '../../../actions/products'
import { useNavigate } from 'react-router-dom'


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addCartItems } from '../../../actions/cart'

const Product = ({product, setCurrentId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id;


  const handleEdit = () => {
    setCurrentId(product._id)
    navigate(`/aone/add-product`)
  }

  const handleAddToCart = () => {
    // dispatch add to cart actions
    dispatch(addCartItems(product._id, navigate))
  }


  return (
    <div className='product-card'>
      
      <div className='product-buttons'>

        {(user?.result?._id === product.creator) && (
          <>         
            <Button variant='contained' size='small' color='secondary' onClick={() => dispatch(deleteProduct(product._id))}><DeleteIcon /></Button> 
            <Button variant='contained' size='small' color='primary' onClick={handleEdit}><EditIcon /></Button>
          </>

        )}

      </div>

      <div className='product-content'>
        <h2>{product.productName}</h2>

        <img src={product.selectedFile} className='product-image' />

        <h2 className='creator-product'>{product.name}</h2>
        <p><b>Price:</b> $ {product.price}</p>
        <p className='desc-product'>{product.description}</p>
      </div>

      {(user?.result?._id) && (
        <button onClick={handleAddToCart} className='add-to-cart'>Add to Cart<ShoppingCartIcon className='atc' /></button>
      )}

    </div>
  )
}

export default Product