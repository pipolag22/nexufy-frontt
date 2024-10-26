import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext";
import categories from "../../../data/category.json"
const FilterSidebar = ({ setFilters }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const navs = [
    {
      id: 1,
      name: "Por precio",
      options: ["Menor a $10000", "Mayor a $10000", "Mayor a $25000"],
      type: "price",
    },
    {
      id: 2,
      name: "Por categoría",
      options: categories.map((category) => category.name),
      type: "category",
    },
  ];

  return (
    <div
      className={`h-100 position-fixed top-0 left-0 ${
        darkMode ? "bg-dark" : "bg-secondary-subtle"
      }`}
      style={{
        width: "17rem",
        paddingTop: "3rem",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Col className="mt-2 pt-5 w-100">
        {navs.map((nav) => (
          <Row key={nav.id} className="py-2 px-5">
            <h3
              className={`nav-link fs-5 d-flex align-items-center text-center fw-bold ${
                darkMode ? "text-light" : "text-body-secondary"
              }`}
            >
              {nav.name}
            </h3>
            {nav.options.map((opt, index) => (
              <p
                key={index}
                className="options"
                onClick={() => handleFilterChange(nav.type, opt)}
                style={{ cursor: "pointer" }}
              >
                {opt}
              </p>
            ))}
          </Row>
        ))}
      </Col>
    </div>
  );
};

export default FilterSidebar;
