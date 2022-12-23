import React, {useState} from 'react';
import {TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createProduct, updateProduct} from '../../../../actions/products';

import {useNavigate} from 'react-router-dom';

import './styles.css'
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddProduct = ({setCurrentId, currentId}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const product = useSelector((state) => (currentId ? state.products.products.find((productName) => productName._id === currentId) : null))

  const [productData, setProductData] = useState({productName: '', category: '', price: '', selectedFile: '', description: ''})

  useEffect(() => {
    if (product) setProductData(product)
  }, [product])

  const clear = () => {
    setCurrentId(0)
    setProductData({productName: '', category: '', price: '', selectedFile: '', description: ''})
  }

  const handleChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId === 0) {
      dispatch(createProduct({...productData, name: user?.result?.name}, navigate));
      clear()
    } else {
      dispatch(updateProduct(currentId, {...productData, name: user?.result?.name}, navigate));
      clear()
    }
  }


  return (
    <form className='add-product-form' onSubmit={handleSubmit}>
      <div className='form-input'>
        <h2>Add Product</h2>
        <TextField
          value={productData.productName}
          className='inputs' 
          label="Product Name"
          name='productName'
          onChange={handleChange}
        />

        
        <FormControl className={classes.formControl}>
          <InputLabel>Category</InputLabel>
          <Select 
          onChange={handleChange} 
          name="category"
          value={productData.category}
          className='selectInput'
          >
            <MenuItem value='top'>Top</MenuItem>
            <MenuItem value='pants'>Pants</MenuItem>
            <MenuItem value='shoes'>Shoes</MenuItem>

          </Select>


        </FormControl>

          <FileBase
          value={productData.selectedFile}
          type="file"
          multiple={false}
          onDone={({base64}) => setProductData({...productData, selectedFile: base64})}
          />

          <TextField 
            value={productData.price}
            type='number'
            label="Price"
            className='inputs'
            onChange={handleChange}
            name='price'
          />



          <TextField
            value={productData.description}
            label="Description"
            className='inputs'
            style={{margin: '40px'}}
            onChange={handleChange}
            name='description'
          />
      </div>
        <div className='add-product-buttons'>
          <Button variant='contained' color='primary' type='submit'>Submit</Button>
          <Button variant='outlined' color='' onClick={clear}>Clear</Button>
        </div>
    </form>
  )
}

export default AddProduct