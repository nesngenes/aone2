import React from 'react'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'

import Products from '../../Products'

import { getProductsByCategory } from '../../../../actions/products'
import { useEffect } from 'react'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const ProductsCategory = ({setCurrentId}) => {
    const dispatch = useDispatch()
    const query = useQuery()
    const category = query.get('category')

    useEffect(() => {
        if(category) {
            dispatch(getProductsByCategory(category))
        }
    }, [dispatch, category])

  return (
    <div>
        <Products setCurrentId={setCurrentId} />
    </div>
  )
}

export default ProductsCategory