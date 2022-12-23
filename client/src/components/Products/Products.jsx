import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Product from './Product/Product';
import {CircularProgress} from '@material-ui/core';
import {TextField, InputAdornment, Button} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';

import './styles.css'
import { getProductsBySearch } from '../../actions/products';
import { useState } from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Products = ({setCurrentId}) => {
  const query = useQuery()
  const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));


  const searchProduct = () => {
    if(search.trim()){
      dispatch(getProductsBySearch({search}));
      navigate(`/aone/products/search?searchQuery=${search || 'none'}`);
    } else {
      Navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      // search product
      searchProduct();
    }
  }
  
  const {products, isLoading} = useSelector((state) => state.products)

  if(!products.length && !isLoading) return (
    <>
      <div className='products-bar'>
          <TextField
          className='searchbar' 
          variant='outlined' 
          label="Search Product" 
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon className='search-icon'/>
              </InputAdornment>
            )
          }}
          />

          {user ? (
            <Link className='links' to="/aone/add-product">
              <Button className='add-product-button' variant="contained" color='primary'>Add Product</Button>
            </Link>
          ) : (
              null
          )}
          
        </div>
        <div className='empty-products'>
          <h1>No products yet</h1>
        </div>
    </>
    ) 


  return (
    <div className='products-page'>
      <div className='products-bar'>
        <TextField
        className='searchbar' 
        variant='outlined' 
        label="Search Product" 
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon onClick={searchProduct}/>
            </InputAdornment>
          )
        }}
        />


        {user ? (
          <Link className='links' to="/aone/add-product">
            <Button className='add-product-button' variant="contained" color='primary'>Add Product</Button>
          </Link>
        ): (
          null
        )}

      </div>

      <div>
        {isLoading ? 
        <div>
          <CircularProgress size="4em" />
        </div>  
        : (
          <div className='the-products'>
            {products.map((product) => (
              <Product product={product} setCurrentId={setCurrentId} />
            ))}
          </div>
        )}

      </div>
    </div>

    
  )
}

export default Products