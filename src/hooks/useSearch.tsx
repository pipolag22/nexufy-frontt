import { useState, useEffect } from "react";
import { searchProducts } from "../api/productService";
import { searchCustomers } from "../api/customerService";

const useSearch = (initialQuery = "", list = [], token, entity = "products") => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredSearch, setFilteredSearch] = useState(list);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        try {
          let results = [];
          if (entity === "products") {
            results = await searchProducts(searchQuery);
          } else if (entity === "customers" && token) {
            results = await searchCustomers(searchQuery, token);
          }
          setFilteredSearch(results);
        } catch (error) {
          setError(error);
        }
      } else {
        setFilteredSearch(list);
      }
    };

    fetchResults();
  }, [searchQuery, list, entity, token]);

  return { searchQuery, setSearchQuery, filteredSearch, error };
};

export default useSearch;
