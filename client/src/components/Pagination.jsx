import React, {useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import { getProducts } from '../actions/products';


const Paginate = ({page}) => {
    const {numberOfPages} = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) {
            dispatch(getProducts(page));
        }
    }, [dispatch, page])

  return (
    <div>
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/aone/products?page=${item.page}`} />
            )}
        />
    </div>
  )
}

export default Paginate