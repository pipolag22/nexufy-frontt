import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = ({ products }) => {
  if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }
  return (
    <>
      <Row
        xs={1}
        md={products.length === 1 ? 1 : 2}
        lg={products.length === 1 ? 1 : 4}
        className="g-4 mx-auto mb-6  justify-content-center"
      >
        {products.map((productMock) => (
          <Col key={productMock.id} className="d-flex justify-content-center">
            <ProductCard
              id={productMock.id}
              image={productMock.urlImage}
              name={productMock.name}
              description={productMock.description}
              price={productMock.price}
              category={productMock.category}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
