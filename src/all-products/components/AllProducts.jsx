import React, { useEffect, useState } from "react";
import ProductList from "../../components/Products/ProductList";
import {getAllProducts} from "../../api/productService"

const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const [ loading, setLoading]= useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data); // Tomar solo los primeros 4 productos
        setLoading(false); // Desactivar estado de carga
      } catch (error) {
        console.error(error);
        setLoading(false); // Desactivar estado de carga en caso de error
      }
    };
    fetchProducts();
  }, []);

  if(loading){
    return  <div>Cargando todos los productos</div>
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default AllProducts;
