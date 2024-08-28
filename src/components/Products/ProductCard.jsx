import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import img from "../../assets/img/metales.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ id, image, name, description, price, category }) => {
  const navigate = useNavigate();
  const handleDetail=()=>{
    navigate(`/product/${id}`,{
      state:{
        product:{
          id:id,
          image:image,
          name:name,
          description:description,
          price:price,
          category:category
        }
      }
    })
  }
  
  return (
    <>
      <Card style={{ height: "28rem", border: "none" }} className="shadow">
      <Card style={{ height: "28rem", border: "none" }} className="shadow">
        <Card.Img variant="top" src={img} />
        <Card.Body className="bg-secundario d-flex flex-column justify-content-around">
          <Card.Title className="fw-semibold">{name}</Card.Title>
          <Card.Text className="text-secondary fw-medium lh-sm ">
            {description}
          </Card.Text>
          <Card.Text className="text-secondary fw-semibold mb-0">
            $ {price} <span className="fw-medium text-secondary">por kg</span>
          </Card.Text>
          <Card.Text className="text-body-tertiary fw-medium">
            <i className="bi bi-star-fill text-primary-custom"></i> {category}
          <Card.Text className="text-body-tertiary fw-medium">
            <i className="bi bi-star-fill text-primary-custom"></i> {category}
          </Card.Text>
          <div className="d-flex justify-content-center mt-3 ">
            <Button
              className="button-gradient border-0 shadow-lg "
              className="button-gradient border-0 shadow-lg "
              style={{ width: "12rem", height: "2rem" }}
              onClick={handleDetail}
            >
              Ver más
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
