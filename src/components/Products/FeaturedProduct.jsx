import ProductList from "./ProductList";

const FeaturedProduct = () => {
  return (
    <>
      <div className="container">
        <p className="fs-3 text-center fw-bold">Productos destacados</p>
        <ProductList />
        <div className="text-end mt-4 me-4 link-opacity-100-hover">
          <a href="#" className="fw-medium ">
            Ver todos los productos →
          </a>
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
