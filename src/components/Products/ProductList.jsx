import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = ({ products }) => {
  const firstFourProducts = products.slice(0, 4);
  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-4">
        {firstFourProducts.map((productMock) => (
          <Col key={productMock.id}>
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
