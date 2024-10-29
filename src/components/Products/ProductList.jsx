import { useContext, useEffect, useState } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import categories from "../../data/category.json";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { deleteProduct, getAllProducts } from "../../api/productService";

const ProductList = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
        // Actualizar el estado de productos para reflejar la eliminación
        const updatedProducts = products.filter(
          (product) => product.id !== productToDelete
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        setProductToDelete(null);
        setShowModal(false);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  // Debugging logs
  console.log("User ID:", user.id);
  console.log("User Roles:", user.roles);

  if (!Array.isArray(filteredProducts)) {
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
        {filteredProducts.map((productMock) => {
          console.log("Product Owner ID (customerId):", productMock.customerId);

          return (
            <Col key={productMock.id} className="d-flex justify-content-center">
              <div style={{ width: "20rem" }}>
                <ProductCard
                  id={productMock.id}
                  image={productMock.urlImage}
                  name={productMock.name}
                  description={productMock.description}
                  price={productMock.price}
                  category={productMock.category}
                  categories={categories}
                  isOwner={user && user.id === productMock.customerId}
                  isSuperAdmin={user && user.roles.includes("ROLE_SUPERADMIN")}
                  handleEdit={handleEdit}
                  confirmDelete={confirmDeleteProduct}
                />
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar este producto?</p>
          <p>
            <strong>Esta acción no se puede deshacer.</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
