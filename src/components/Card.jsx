import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CardPresent = ({name, description, price, category }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{price}</ListGroup.Item>
          <ListGroup.Item>{category}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default CardPresent;
