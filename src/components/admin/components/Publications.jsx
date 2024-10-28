import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"; // Importa useNavigate
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { Button, Alert } from "react-bootstrap";
import CreateProductForm from "./CreateProductForm";
import { postProduct } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext";
import translations from "../../themes/translations";

const Publications = () => {
  const { user, reloadUserData } = useOutletContext();
  const navigate = useNavigate(); // Inicializa useNavigate
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openNewProduct, setOpenNewProduct] = useState(false);

  const token = localStorage.getItem("token");

  const handleCreatePublication = () => {
    setOpenNewProduct(true);
  };

  const fetchUserProducts = async () => {
    try {
      if (user && user.id) {
        const data = await getProductsByCustomerId(user.id, token);
        setProducts(data);
      }
    } catch (error) {
      setError(error.message || t.errorFetchingProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, [user, token]);

  const handleSave = async (newProduct) => {
    const customerId = user.id;
    const productData = {
      ...newProduct,
      customerId: customerId,
    };
    try {
      await postProduct(productData, customerId, token);
      setOpenNewProduct(false);
      await fetchUserProducts(); // Vuelve a cargar los productos después de agregar uno nuevo
    } catch (err) {
      console.error(err);
      setError(err.message || t.errorSavingProduct);
    }
  };

  const canPublish = user?.roles?.some((role) =>
    ["ROLE_ADMIN", "ROLE_SUPERADMIN"].includes(role.toUpperCase())
  );

  useEffect(() => {
    console.log("Roles del usuario (estructura completa):", user.roles);
    console.log("Puede publicar:", canPublish);
  }, [user]);

  if (isLoading) {
    return <p>{t.loading}</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div
      className={`container ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } p-4 rounded`}
    >
      {!canPublish && (
        <Alert variant="info" className="mt-3">
          {t.needToBeAdminToPublishMessage}
        </Alert>
      )}

      {canPublish ? (
        openNewProduct ? (
          <CreateProductForm onSave={handleSave} />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2>{t.productsPublishedByYou}</h2>
              <Button
                variant="outline-primary"
                onClick={handleCreatePublication}
              >
                {t.publishNew}
              </Button>
            </div>
            <div className="d-flex flex-wrap">
              {products.length > 0 ? (
                <ProductList products={products} />
              ) : (
                <p>{t.noProductsPublished}</p>
              )}
            </div>
          </>
        )
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            // Recarga los datos del usuario
            navigate("/admin/datos"); // Redirige a la URL
          }}
          className="mt-3"
        >
          Ir al perfil de administrador
        </Button>
      )}
    </div>
  );
};

export default Publications;
