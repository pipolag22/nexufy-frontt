// CategoryList.js
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../themes/ThemeContext"; // Importar ThemeContext
import { LanguageContext } from "../themes/LanguageContext"; // Importar LanguageContext
import translations from "../themes/translations"; // Importar las traducciones
import CategoryCard from "./CategoryCard";
import Image1 from "../../assets/img/metales.jpg";
import Image2 from "../../assets/img/polimeros.png";
import Image3 from "../../assets/img/quimico.jpg";
import Image4 from "../../assets/img/textil.jpg";
import Image5 from "../../assets/img/maderas.jpg";
import Image6 from "../../assets/img/alimentos.jpg";
import Image7 from "../../assets/img/electronico.png";
import Image8 from "../../assets/img/construccion.jpg";
import Image9 from "../../assets/img/envases.jpg";

const imageMap = {
  image1: Image1,
  image2: Image2,
  image3: Image3,
  image4: Image4,
  image5: Image5,
  image6: Image6,
  image7: Image7,
  image8: Image8,
  image9: Image9,
};

const CategoryList = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  // Obtener las categorías traducidas
  const categories = t.categoriess;

  return (
    <div className="mb-3">
      <p
        className={`fs-3 text-center fw-bold ${
          darkMode ? "text-light" : "text-dark"
        }`}
      >
        {t.categoriesTitle}
      </p>
      <div className="container">
        <Row xs={1} md={2} lg={3} className="g-4">
          {categories.map((category) => (
            <Col key={category.id}>
              <CategoryCard
                id={category.id}
                image={imageMap[category.image]}
                name={category.name}
                description={category.description}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoryList;
