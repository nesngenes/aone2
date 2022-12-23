import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, addItemsAmount, substractItemsAmount, removeCartItems, stripeCheckout } from '../../actions/cart';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


import './styles.css'

const Cart = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const items = useSelector((state) => (state.cart.items.data))
  const totalPrice = useSelector((state) => (state.cart.items.totalPrice))
  const totalAmount = useSelector((state) => (state.cart.items.totalAmount))
  
  const data = useSelector((state) => (state.cart.items)) 
  
  const isLoading = useSelector((state) => (state.cart.isLoading))
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, totalAmount])
  

  return (
    isLoading ? <p>Loading ... if something wont came up please refresh the page ..</p> : (
      <div className='cart-items'>
        {items?.map((item) => (
          <div className='cart-item'>
            <div>
              <h4>{item.itemName}</h4>  
              <img src={item.itemImage} width='90px' />
            </div>
            <p>${item.itemPrice}</p>
            <p className='cart-amount'>{item.itemAmount}</p>
            <div className='amount-buttons'>
              <button onClick={() => dispatch(substractItemsAmount(item._id))}><RemoveIcon /></button>
              <button onClick={() => dispatch(addItemsAmount(item._id))}><AddIcon /></button>
              <button onClick={() => dispatch(removeCartItems(item._id))}><DeleteIcon /></button>
            </div>
          </div>
        ))}

        <div className='total-price-cart'>Total Price: ${totalPrice}</div>

        <p>cara melakukan pembelian: </p>
        <p>masukkan nomor visa uji coba stripe: 4242424242424242</p>
        <p>Masukkan bullan / tahun di masa depan untuk MM/YY</p>
        <p>masukkan 3 angka apa saja untuk cvc</p>

        <button onClick={() => dispatch(stripeCheckout())} className='checkout-button'>Checkout</button>
      </div>
    )
  )
}

export default Cart