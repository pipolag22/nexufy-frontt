import React, { useState } from "react"; 
import { Button, Form } from "react-bootstrap"; // Asegúrate de importar estos componentes

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  const [debounceTimeOut, setDebounceTimeOut] = useState(null);

  const handleInputSearch = (event) => {
    const value = event.target.value;

    // debounceTimeOut es un temporizador que activa la busqueda en tiempo real
    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut);
    }

    // Aca se va a crear un temporizador en la nueva busqueda
    const timeout = setTimeout(() => {
      setSearchQuery(value); // Actualiza el query de búsqueda en el componente padre
    }, 0); 
    setDebounceTimeOut(timeout);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (searchQuery) {
      setSearchQuery(searchQuery); // Asegúrate de enviar el valor al padre
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Buscar producto"
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
        aria-label="Buscar"
        value={searchQuery} // Mantiene el control del valor del input
        onChange={handleInputSearch}
      />
      <Button
        className="mx-2"
        variant={darkMode ? "outline-light" : "outline-primary"}
        type="submit"
      >
        <i className="bi bi-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBar;
