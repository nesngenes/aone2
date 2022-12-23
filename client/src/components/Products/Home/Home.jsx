import React from 'react'
import Products from '../Products'
import Paginate from '../../Pagination'
import {useLocation} from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = ({setCurrentId}) => {
      const query = useQuery()
    const page = query.get('page') || 1;
  return (
    <>
        <Products setCurrentId={setCurrentId} />
        <Paginate 
          page={page}
        />
    </>
  )
}

export default Home