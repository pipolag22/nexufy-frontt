// const env = import.meta.env.VITE_API_HOST;

// Product services
export async function getProduct(productId) {
  try {
    const response = await fetch(
      "http://localhost:8081/api/products/" + productId,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      name: data.name,
      description: data.description,
      image: data.urlImage,
      price: data.price,
      category: data.category,
      customerId: data.customerId,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:8081/api/products", {
      headers: {
        accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function postProduct(newProduct, customerId, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/customer/${customerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
export async function getSellerContact(customerId, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/customer/${customerId}/contact`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch seller contact:", error);
    throw error;
  }
}

// Comments services
export async function getComments(productId) {
  try {
    const response = await fetch(
      "http://localhost:8081/api/rating-comments/product/" + productId,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
}

export async function postComments(commentData) {
  try {
    const response = await fetch("http://localhost:8081/api/rating-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Error en el envío del comentario");
    }
  } catch (error) {
    console.log("Failed to send Comment ", error);
  }
}

export async function searchProducts(searchQuery) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/search?name=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error en la búsqueda de productos");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error al buscar usuarios!", err);
    return [];
  }
}
export async function getProductCountsByCategory() {
  try {
    const response = await fetch(
      "http://localhost:8081/api/products/categories/counts",
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener el conteo de productos por categoría");
    }
    const data = await response.json();
    return data; // Devuelve un objeto { "Categoría1": conteo1, "Categoría2": conteo2, ... }
  } catch (error) {
    console.error(
      "Error al obtener el conteo de productos por categoría:",
      error
    );
    throw error;
  }
}
export async function updateProduct(productId, productData, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    return await response.json(); // Devuelve el producto actualizado
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
}
export async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}
export async function getProductsByCustomerId(customerId, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/customer/${customerId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching user products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getProductsByCustomerId:", error);
    throw error;
  }
}
