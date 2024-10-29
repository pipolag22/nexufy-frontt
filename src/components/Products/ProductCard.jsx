import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  category,
  isOwner,
  isSuperAdmin,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/product/${id}`, {
      state: {
        product: {
          id,
          image,
          name,
          description,
          price,
          category,
        },
      },
    });
  };

  return (
    <Card
      style={{ height: "28rem", width: "20rem", border: "none" }}
      className="shadow mb-2 mx-auto"
    >
      <Card.Img
        variant="top"
        src={image}
        alt="Imagen del producto"
        style={{ height: "12rem", objectFit: "cover" }} // Ajuste de imagen
      />
      <Card.Body
        className={`bg-secundario d-flex flex-column justify-content-between`}
      >
        <div>
          <Card.Title
            className={`fw-semibold ${
              darkMode ? "text-white" : "text-primary"
            }`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }} // Ajustes de texto
          >
            {name}
          </Card.Title>
          <Card.Text
            className={`fw-medium lh-sm ${
              darkMode ? "text-white" : "text-secondary"
            }`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }} // Ajustes de texto
          >
            {description}
          </Card.Text>
          <Card.Text
            className={`fw-semibold mb-0 ${
              darkMode ? "text-white" : "text-primary"
            }`}
          >
            $ {price}
          </Card.Text>
          <Card.Text
            className={`fw-medium ${
              darkMode ? "text-white" : "text-secondary"
            }`}
          >
            {category}
          </Card.Text>
        </div>

        {/* Botones de editar y eliminar se mueven aquí */}
        {(isOwner || isSuperAdmin) && (
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button
              onClick={() => {
                // Lógica para editar
                console.log(`Editando producto ${id}`);
              }}
              variant={darkMode ? "outline-light" : "outline-secondary"}
              size="sm"
              className="w-25"
            >
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              onClick={() => {
                // Lógica para eliminar
                console.log(`Eliminando producto ${id}`);
              }}
              variant="danger"
              size="sm"
              className="w-25"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        )}

        {/* Botón de "Ver más" que ocupa todo el ancho de la tarjeta */}
        <div className="d-flex justify-content-center mt-3">
          <Button
            className="button-gradient border-0 shadow-lg"
            onClick={handleDetail}
            style={{ width: "100%" }}
          >
            Ver más
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
