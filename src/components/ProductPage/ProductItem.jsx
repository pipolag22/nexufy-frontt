import React from "react";
import ProductCard from "./components/ProductCard";
import ProductData from "./components/ProductData";
import ProductSeller from "./components/ProductSeller";
import { useLocation } from "react-router-dom";
import ProductComments from "./components/ProductComments";

const ProductItem = () => {
  const location = useLocation();
  const { id, image, name, description, price, category } = location.state.product;
  return (
    <>
      <ProductCard id={id} image={image} name={name}  price={price} category={category}/>
      <ProductData description={description}/>
      <hr className="container border-2" />
      <ProductSeller />
      <h3 className="container fs-3 fw-medium my-4">Comentarios del producto</h3>
      <ProductComments productId={id}/>
    </>
  );
};

export default ProductItem;
