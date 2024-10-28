import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import categories from "../../data/category.json";

const ProductList = ({ products }) => {
  if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }
  return (
    <>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4 mx-auto mb-6 justify-content-center"
      >
        {products.map((productMock) => (
          <Col key={productMock.id} className="d-flex justify-content-center">
            <div style={{ width: "20rem" }}>
              {" "}
              {/* Ancho fijo para las tarjetas */}
              <ProductCard
                id={productMock.id}
                image={productMock.urlImage}
                name={productMock.name}
                description={productMock.description}
                price={productMock.price}
                category={productMock.category}
                categories={categories} // Pasar las categorías como prop
                isOwner={productMock.isOwner} // Asegúrate de pasar esta prop
                isSuperAdmin={productMock.isSuperAdmin} // Asegúrate de pasar esta prop
              />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
