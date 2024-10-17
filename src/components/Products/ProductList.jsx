import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = ({ products }) => {
  if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }
  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-4 mx-4 mb-6">
        {products.map((productMock) => (
          <Col key={productMock?.id}>
            <ProductCard
              id={productMock.id}
              image={productMock?.urlImage}
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
