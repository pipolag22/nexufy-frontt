import { useContext, useState } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import categories from "../../data/category.json";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { deleteProduct } from "../../api/productService";
import { LanguageContext } from "../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../themes/translations"; // Importar las traducciones
import placeholder from "../../assets/img/placeholder.jpg";

const ProductList = ({ products, fetchUserProducts }) => {
  const { user } = useContext(AuthenticationContext);
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setProductToDelete(null);
        setShowModal(false);
        await fetchUserProducts();
      } catch (error) {
        console.error(t.errorFetchingProducts, error); // Uso de traducción
      }
    }
  };

  if (!products || products.length === 0) {
    return <p>{t.noProductsPublished}</p>; // Uso de traducción
  }

  return (
    <>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4 mx-auto mb-6 justify-content-center"
        style={{ rowGap: "3rem", columnGap: "3rem" }}
      >
        {products.map((product) => (
          <Col key={product.id} className="d-flex justify-content-center">
            <div style={{ width: "20rem", margin: "0 2rem" }}>
              <ProductCard
                id={product.id}
                image={
                  product.urlImage?.length > 0 ? product.urlImage : placeholder
                }
                name={product.name}
                description={product.description}
                price={product.price}
                category={product.category}
                categories={categories}
                isOwner={user && user.id === product.customerId}
                isSuperAdmin={user && user.roles.includes("ROLE_SUPERADMIN")}
                handleEdit={handleEdit}
                confirmDelete={confirmDeleteProduct}
              />
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t.confirmDeleteTitle}</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <p>{t.confirmDeleteText}</p>
          <p>
            <strong>{t.confirmDeleteWarning}</strong>{" "}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t.confirmDeleteCancelButton}
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            {t.confirmDeleteConfirmButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
