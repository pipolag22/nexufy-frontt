import React from 'react'
import ProductCard from './components/ProductCard'
import ProductData from './components/ProductData'
import ProductSeller from './components/ProductSeller'

const ProductItem = () => {
  return (
    <>
    <ProductCard/>
    <ProductData/>
    <hr className='container border-2'/>
    <ProductSeller/>
    </>
  )
}

export default ProductItem